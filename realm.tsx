import Realm from 'realm';
import {Exercise, GroupExercises, Maximus, MuscleGroup} from "./types.tsx";
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';

const MuscleGroupSchema = {
    name: 'MuscleGroup',
    properties: {
        id: 'int',
        name: 'string',
        exercises: 'string[]',
    },
    primaryKey: 'id',
}
const SetSchema = {
    name: 'Set',
    properties: {
        id: 'string',
        reps: 'int',
        kg: 'int',
    },
    primaryKey: 'id',
};

const ExerciseSchema = {
    name: 'Exercise',
    properties: {
        id: 'string',
        exerciseName: 'string',
        sets: 'Set[]',
    },
    primaryKey: 'id',

};

const GroupExercisesSchema = {
    name: 'GroupExercises',
    properties: {
        id: 'string',
        groupName: 'string',
        exercises: 'Exercise[]',
    },
    primaryKey: 'id',
};

const MaximusSchema = {
    name: 'Maximus',
    properties: {
        date: 'string',
        allExercises: 'GroupExercises[]',
    },
    primaryKey: 'date',
};

const realm = new Realm({schema: [MuscleGroupSchema, SetSchema, ExerciseSchema, GroupExercisesSchema, MaximusSchema]})

export const initDB = () => {
    realm.write(() => {
        if (realm.isEmpty) {
            realm.create('MuscleGroup', {
                id: 1,
                name: 'hands',
                exercises: [],
            })
            realm.create('MuscleGroup', {
                id: 2,
                name: 'legs',
                exercises: [],
            })
            realm.create('MuscleGroup', {
                id: 3,
                name: 'chest',
                exercises: [],
            })
            realm.create('MuscleGroup', {
                id: 4,
                name: 'back',
                exercises: [],
            })
            realm.create('MuscleGroup', {
                id: 5,
                name: 'shoulders',
                exercises: [],
            })

        }
    })
}

export const schemas = [MuscleGroupSchema, SetSchema, ExerciseSchema, GroupExercisesSchema, MaximusSchema];

export const addExerciseNameToDB = (groupName: string, exercise: string) => {
    realm.write(() => {
        const group = realm.objects<MuscleGroup>('MuscleGroup').filtered('name = $0', groupName)[0]
        if (group) {
            group.exercises.push(exercise)
        }
    })
}

export const removeExerciseNameFromDB = (groupName: string, exerciseName: string) => {
    realm.write(() => {
        const group = realm.objects<MuscleGroup>('MuscleGroup').filtered('name = $0', groupName)[0]
        if (group) {
            const exerciseIndex = group.exercises.indexOf(exerciseName)
            if (exerciseIndex > -1) {
                group.exercises.splice(exerciseIndex, 1)
            }
        }
    })
}

export const getExercisesNamesFromDB = (groupName: string) => {
    const group = realm.objects<MuscleGroup>('MuscleGroup').filtered('name = $0', groupName)[0]
    return group ? group.exercises : []
}

export const addExerciseToDB = (date: string, groupName: string, exerciseName: string) => {

    const exercise = {
        id: uuidv4(),
        exerciseName: exerciseName,
        sets: [],
    }

    realm.write(() => {
        let day = realm.objectForPrimaryKey('Maximus', date) as Maximus | null

        if (!day) {
            day = realm.create('Maximus', {
                date,
                allExercises: [],
            })
        }

        let muscleGroup: GroupExercises | undefined = day?.allExercises.find((group: GroupExercises): boolean => group.groupName === groupName)

        if (!muscleGroup) {
            muscleGroup = {
                id: uuidv4(),
                groupName: groupName,
                exercises: [exercise],
            }
            day?.allExercises.push(muscleGroup)
        } else {
            muscleGroup.exercises.push(exercise)
        }
    })

    return exercise
}

export const getExercisesByDateAndGroup = (date: string, groupName: string) => {
    const day = realm.objectForPrimaryKey<Maximus>('Maximus', date);
    if (day) {
        return day.allExercises.find(group => group.groupName === groupName)
    }
};

export const getMuscleGroupsNamesWithExercisesForDay = (date: string) => {
    const day = realm.objectForPrimaryKey<Maximus>('Maximus', date);

    if (day) {
        return day.allExercises.map(group => group.groupName)
    }

    return []
};

export const getSetsByExerciseId = (exerciseId: string) => {
    const exercise = realm.objectForPrimaryKey('Exercise', exerciseId) as Exercise | null;
    return exercise?.sets ?? []
}

export const addSetToExercise = (exerciseId: string, reps: number, kg: number) => {
    realm.write(() => {
        const exercise = realm.objectForPrimaryKey('Exercise', exerciseId) as Exercise;
        const newSet = {
            id: uuidv4(),
            reps,
            kg,
            isDone: false,
        }
        exercise.sets.push(newSet)
    })
}

export const removeSetFromExercise = (exerciseId: string, setId: string) => {
    realm.write(() => {
        const exercise = realm.objectForPrimaryKey('Exercise', exerciseId) as Exercise | null
        const setIndex = exercise?.sets?.findIndex((set) => set.id === setId)
        typeof setIndex === 'number' && exercise?.sets?.splice(setIndex, 1)
    })
}

export const removeExerciseFromDB = (groupId: string, exerciseId: string) => {
    realm.write(() => {
        const group = realm.objectForPrimaryKey<GroupExercises>('GroupExercises', groupId);

        if (group) {
            group.exercises = group.exercises.filter((exercise) => exercise.id !== exerciseId);
            if (group.exercises.length === 0) {
                const day = realm.objects<Maximus>('Maximus').filtered('allExercises.id = $0', groupId)[0];
                if (day) {
                    day.allExercises = day.allExercises.filter(g => g.id !== groupId);
                    if (day.allExercises.length === 0) {
                        realm.delete(day);
                    }
                }
            }
        }

    });
};

export const getExercisesInfoForDay = (date: string) => {

    const day = realm.objectForPrimaryKey<Maximus>('Maximus', date);

    if (day) {
        const muscleGroupsWithExercises: string[] = [];
        let totalSets: number = 0
        let totalReps: number = 0

        day.allExercises.forEach((group) => {
            if (group.exercises.length > 0) {
                muscleGroupsWithExercises.push(group.groupName)

                group.exercises.forEach((exercise) => {
                    totalSets += exercise.sets.length

                    exercise.sets.forEach((set) => {
                        totalReps += set.reps;
                    })
                })
            }
        })

        if (muscleGroupsWithExercises.length > 0) {
            return {
                date: day.date,
                muscleGroups: muscleGroupsWithExercises,
                totalSets,
                totalReps
            }
        }
    }

    return null
}


export const getAllDaysWithExercises = () => {
    const allDays = realm.objects<Maximus>('Maximus')

    return allDays.map((day) => (new Date(day.date).toLocaleDateString('en-CA')))
}