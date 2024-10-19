export type MuscleGroup = {
    id: number
    name: string
    exercises: string[]
}

export type Set = {
    id: string;
    reps: number;
    kg: number;
}

export type Exercise = {
    id: string
    exerciseName: string;
    sets: Set[];
}

export type GroupExercises = {
    id: string
    groupName: string;
    exercises: Exercise[];
}

export type Maximus = {
    date: string;
    allExercises: GroupExercises[];
}

export type InfoDayCard = {
    date: string,
    muscleGroups: string[],
    totalSets: number,
    totalReps: number
} | null

