export interface Exercise {
  name: string;
  weight: number;
  length: number;
  reps: number;
  sets: number;
  rest: number;
}

export interface Workout {
  name: string;
  day: number;
  exercises: [Exercise];
}
