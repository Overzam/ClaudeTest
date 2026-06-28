import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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
import { Colors } from '@/constants/Colors';
import { useLessonStore } from '@/stores/lessonStore';
import { useGameStore } from '@/stores/gameStore';
import { useProgressStore } from '@/stores/progressStore';
import { useAuthStore } from '@/stores/authStore';
import { submitLessonProgress, unlockNextLesson, fetchLessonById } from '@/services/lessonService';
import { updateStreak, incrementLessonsCompleted } from '@/services/statsService';
import { useBadgeStore } from '@/stores/badgeStore';

export default function LessonScreen() {
  const insets = useSafeAreaInsets();
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
    const userId = session?.user.id;
    if (!userId || !lessonId) return;

    await gameStore.gainXP(lessonStore.xpEarned);
    await updateStreak(userId);
    await incrementLessonsCompleted(userId);

    const lessonData = await fetchLessonById(lessonId);
    if (lessonData) {
      const pathId = lessonData.path_id ?? '';
      await submitLessonProgress(userId, lessonId, pathId, lessonStore.score);
      await unlockNextLesson(userId, lessonData.order_index, pathId);
    }
    markComplete(lessonId);
    checkBadges(userId);

    router.replace({
      pathname: '/lesson/recipe',
      params: {
        lessonId,
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

  if (lessonStore.phase === 'loading' || !lessonStore.exercises.length) {
    return <LoadingScreen />;
  }

  const exercise = lessonStore.exercises[lessonStore.currentIndex];
  const progress = (lessonStore.currentIndex + (lessonStore.phase === 'feedback' ? 1 : 0)) / lessonStore.exercises.length;

  function renderExercise() {
    const submit = (correct: boolean, correctAnswerText?: string) => {
      lessonStore.submitAnswer(correct, correctAnswerText);
      if (!correct) gameStore.loseHeart();
      if (gameStore.hearts <= 1 && !correct) {
        setTimeout(() => {
          Alert.alert('Plus de vies !', 'Reviens dans quelques heures pour récupérer des vies.', [
            { text: 'OK', onPress: () => router.back() },
          ]);
        }, 500);
      }
    };

    switch (exercise.type) {
      case 'multiple_choice':
        return <MultipleChoice question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'step_ordering':
        return <StepOrdering question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'photo_identification':
        return <PhotoIdentification question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'association':
        return <Association question={exercise.question} data={exercise.data} onSubmit={submit} />;
      case 'fill_in_blank':
        return <FillInBlank question={exercise.question} data={exercise.data} onSubmit={submit} />;
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ExerciseHeader
        progress={progress}
        hearts={gameStore.hearts}
        onClose={handleClose}
      />
      <View style={styles.exercise}>{renderExercise()}</View>
      {lessonStore.phase === 'feedback' && lessonStore.lastAnswerCorrect !== null && (
        <AnswerFeedback
          correct={lessonStore.lastAnswerCorrect}
          correctAnswerText={lessonStore.correctAnswerText}
          onContinue={lessonStore.nextExercise}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  exercise: { flex: 1 },
});

