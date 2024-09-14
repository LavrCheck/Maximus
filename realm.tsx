import Realm from 'realm';


type MuscleGroup = {
    id: number
    name: string
    exercises: string[]
}

const MuscleGroupSchema = {
    name: 'MuscleGroup', 
    properties: {
        id: 'int',
        name: 'string',
        exercises: 'string[]', 
    },
    primaryKey: 'id',
}

const realm = new Realm({ schema: [MuscleGroupSchema] })

export const initDB = () => {

    realm.write(() => {
        realm.deleteAll()
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

    console.log(realm.objects('MuscleGroup'))

}

export const schemas = [MuscleGroupSchema];

export const addExerciseToDB = (groupName: string, exercise: string) => {
    realm.write(() => {
        const group = realm.objects<MuscleGroup>('MuscleGroup').filtered('name = $0', groupName)[0]
        if (group) {
            group.exercises.push(exercise)
        }
    })
}

export const getExercisesFromDB = (groupName: string) => {
    const group = realm.objects<MuscleGroup>('MuscleGroup').filtered('name = $0', groupName)[0]
    return group ? group.exercises : []
}