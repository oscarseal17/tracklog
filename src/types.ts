export interface Set {
  id: number;
  meters: number;
  seconds: number;
}

export interface Workout {
  id: number;
  date: string;
  name: string;
  sets: Set[];
}
