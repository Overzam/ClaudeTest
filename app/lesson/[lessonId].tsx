import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ExerciseHeader } from '@/components/lesson/ExerciseHeader';
import { AnswerFeedback } from '@/components/lesson/AnswerFeedback';
import { MultipleChoice } from '@/components/lesson/exercises/MultipleChoice';
import { StepOrdering } from '@/components/lesson/exercises/StepOrdering';
import { PhotoIdentification } from '@/components/lesson/exercises/PhotoIdentification';
import { Association } from '@/components/lesson/exercises/Association';
import { FillInBlank } from '@/components/lesson/exercises/FillInBlank';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useThemeStore } from '@/stores/themeStore';
import { useLessonStore } from '@/stores/lessonStore';
import { useGameStore } from '@/stores/gameStore';
import { useProgressStore } from '@/stores/progressStore';
import { useAuthStore } from '@/stores/authStore';
import { submitLessonProgress, unlockNextLesson, fetchLessonById } from '@/services/lessonService';
import { updateStreak, incrementLessonsCompleted } from '@/services/statsService';
import { useBadgeStore } from '@/stores/badgeStore';
import { NoHeartsModal } from '@/components/gamification/NoHeartsModal';
import { playSound } from '@/services/soundService';

export default function LessonScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeStore();
  const [showNoHearts, setShowNoHearts] = useState(false);
  const { lessonId, lessonTitle } = useLocalSearchParams<{ lessonId: string; lessonTitle?: string }>();
  const { session } = useAuthStore();
  const lessonStore = useLessonStore();
  const gameStore = useGameStore();
  const { markComplete } = useProgressStore();
  const { checkBadges } = useBadgeStore();

  useEffect(() => {
    if (lessonId) lessonStore.loadLesson(lessonId, lessonTitle);
    return () => lessonStore.reset();
  }, [lessonId]);

  useEffect(() => {
    if (lessonStore.phase === 'complete') {
      handleComplete();
    }
  }, [lessonStore.phase]);

  async function handleComplete() {
    if (!lessonId) return;
    const userId = session?.user.id ?? 'guest-local';

    playSound('lessonComplete');
    markComplete(lessonId);

    // Best-effort progress sync: a Supabase hiccup (network, RLS, etc.) here
    // must never block navigation to the completion screen — the player
    // already finished the lesson and should always see their results.
    try {
      const lessonData = await fetchLessonById(lessonId);
      if (lessonData) {
        const pathId = lessonData.path_id ?? '';
        await submitLessonProgress(userId, lessonId, pathId, lessonStore.score);
        await unlockNextLesson(userId, lessonData.order_index, pathId);
      }

      await gameStore.gainXP(lessonStore.xpEarned);
      if (session?.user.id) {
        await updateStreak(userId);
        await incrementLessonsCompleted(userId);
        checkBadges(userId);
      }
    } catch (e) {
      console.warn('[LessonScreen] handleComplete sync error:', e);
    }

    router.replace({
      pathname: '/lesson/recipe',
      params: {
        lessonId,
        lessonTitle: lessonTitle ?? '',
        xpEarned: String(lessonStore.xpEarned),
        score: String(lessonStore.score),
        mistakes: String(lessonStore.mistakesCount),
      },
    });
  }

  function handleClose() {
    Alert.alert('Quitter la leçon ?', 'Ta progression sera perdue.', [
      { text: 'Rester', style: 'cancel' },
      { text: 'Quitter', style: 'destructive', onPress: () => router.back() },
    ]);
  }

  if (lessonStore.phase === 'loading') {
    return <LoadingScreen />;
  }

  if (!lessonStore.exercises.length) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: theme.colors.background }]}>
        <ExerciseHeader progress={0} hearts={gameStore.hearts} onClose={handleClose} />
        <View style={styles.comingSoon}>
          <Text style={[styles.comingSoonEmoji]}>🍳</Text>
          <Text style={[styles.comingSoonTitle, { color: theme.colors.text }]}>Leçon bientôt disponible</Text>
          <Text style={[styles.comingSoonSubtitle, { color: theme.colors.textMuted }]}>
            Les exercices pour cette leçon sont en cours de préparation. Reviens vite !
          </Text>
          <TouchableOpacity
            style={[styles.comingSoonButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleClose}
          >
            <Text style={styles.comingSoonButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const exercise = lessonStore.exercises[lessonStore.currentIndex];
  const progress = (lessonStore.currentIndex + (lessonStore.phase === 'feedback' ? 1 : 0)) / lessonStore.exercises.length;

  function renderExercise() {
    const submit = (correct: boolean, correctAnswerText?: string) => {
      lessonStore.submitAnswer(correct, correctAnswerText);
      if (correct) {
        playSound('correct');
        setTimeout(() => playSound('xpGain'), 120);
      } else {
        playSound('incorrect');
        gameStore.loseHeart();
        if (gameStore.hearts <= 1) {
          setTimeout(() => setShowNoHearts(true), 600);
        }
      }
    };

    // Keying by exercise id/index forces React to remount the exercise
    // component when moving to the next question — otherwise it reuses the
    // same instance and its internal answer state (e.g. selected option)
    // leaks into the next question, leaving "Vérifier" wrongly enabled.
    const key = exercise.id ?? lessonStore.currentIndex;

    switch (exercise.type) {
      case 'multiple_choice':
        return <MultipleChoice key={key} question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'step_ordering':
        return <StepOrdering key={key} question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'photo_identification':
        return <PhotoIdentification key={key} question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'association':
        return <Association key={key} question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'fill_in_blank':
        return <FillInBlank key={key} question={exercise.question} data={exercise.data} onSubmit={submit} />;
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: theme.colors.background }]}>
      <ExerciseHeader
        progress={progress}
        hearts={gameStore.hearts}
        onClose={handleClose}
      />
      {/* Hidden (not unmounted, to preserve state) and non-interactive during
          feedback — otherwise its own "Vérifier" button stays tappable and
          visually peeks out from behind the feedback overlay's "Continuer". */}
      <View
        style={[styles.exercise, lessonStore.phase === 'feedback' && styles.exerciseHidden]}
        pointerEvents={lessonStore.phase === 'feedback' ? 'none' : 'auto'}
      >
        {renderExercise()}
      </View>
      {lessonStore.phase === 'feedback' && lessonStore.lastAnswerCorrect !== null && (
        <View style={styles.feedbackOverlay}>
          <AnswerFeedback
            correct={lessonStore.lastAnswerCorrect}
            correctAnswerText={lessonStore.correctAnswerText}
            explanation={lessonStore.lastAnswerCorrect && (exercise?.data as any)?.anecdote ? (exercise.data as any).anecdote : undefined}
            onContinue={lessonStore.nextExercise}
          />
        </View>
      )}
      <NoHeartsModal
        visible={showNoHearts}
        onClose={() => { setShowNoHearts(false); router.back(); }}
        onRefill={() => { setShowNoHearts(false); router.push('/premium' as any); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  exercise: { flex: 1 },
  exerciseHidden: { opacity: 0 },
  feedbackOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'flex-end' },
  comingSoon: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 16 },
  comingSoonEmoji: { fontSize: 64 },
  comingSoonTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  comingSoonSubtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  comingSoonButton: { marginTop: 8, paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12 },
  comingSoonButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

