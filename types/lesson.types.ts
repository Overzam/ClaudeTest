export type ExerciseType =
  | 'multiple_choice'
  | 'step_ordering'
  | 'photo_identification'
  | 'association';

interface BaseExercise {
  id: string;
  lessonId: string;
  orderIndex: number;
  question: string;
  imageUrl?: string;
  xpReward: number;
}

export interface MultipleChoiceData {
  options: string[];
  correctIndex: number;
}

export interface StepOrderingData {
  steps: string[];
  correctOrder: number[];
}

export interface PhotoIdentificationData {
  options: Array<{ label: string; imageUrl: string }>;
  correctIndex: number;
}

export interface AssociationData {
  pairs: Array<{ left: string; right: string }>;
}

export type Exercise =
  | (BaseExercise & { type: 'multiple_choice'; data: MultipleChoiceData })
  | (BaseExercise & { type: 'step_ordering'; data: StepOrderingData })
  | (BaseExercise & { type: 'photo_identification'; data: PhotoIdentificationData })
  | (BaseExercise & { type: 'association'; data: AssociationData });
