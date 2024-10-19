import React, {useEffect, useRef, useState} from "react"
import {Dimensions, Keyboard, ScrollView, StyleSheet, TextInput, View} from "react-native"
import {colors} from "../../styles/colors.tsx"
import {MuscleGroupsSelection} from "../components/addScreen/MuscleGroupsSelection.tsx"
import {AddScreenHeader} from "../components/addScreen/AddScreenHeader.tsx"
import {ExerciseNameSection} from "../components/addScreen/exerciseNameSection/ExerciseNameSection.tsx"
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {ExerciseCard} from "../components/addScreen/exerciseCard/ExerciseCard.tsx";
import {ChooseMuscleGroupTextAnimated} from "../components/addScreen/ChooseMuscleGroupTextAnimated.tsx";
import {
    getExercisesByDateAndGroup,
    getExercisesNamesFromDB,
    getMuscleGroupsNamesWithExercisesForDay,
    removeExerciseFromDB
} from "../../realm.tsx";
import {SafeAreaView} from 'react-native-safe-area-context';
import {Exercise, GroupExercises} from "../../types.tsx"
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid'


export const AddScreen = ({route, navigation}: any) => {


    const selectedDay: Date = new Date(route.params.selectedDay)

    const scrollRef = useRef<ScrollView | null>(null);
    const addExerciseSectionInputRef = useRef<TextInput>(null)

    const [activeGroup, setActiveGroup] = useState<string>('')
    const [filledGroups, setFilledGroups] = useState<string[]>([])
    const [exercisesNames, setExercisesNames] = useState<string[]>([])
    const [groupExercises, setGroupExercises] = useState<any>({})

    const translateX = useSharedValue(Dimensions.get('window').width)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}],
            flex: 1,
            justifyContent: 'space-between'
        }
    })

    useEffect(() => {
        updateFilledGroups()
    }, [])

    useEffect(() => {
        if (activeGroup) {
            reload()
        }
    }, [activeGroup])


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            addExerciseSectionInputRef.current?.isFocused() && scrollRef.current?.scrollToEnd()
        })

        return () => {
            keyboardDidShowListener.remove()
        }
    }, [])

    const reload = () => {
        const groupExercises: GroupExercises | undefined = getExercisesByDateAndGroup(String(selectedDay), activeGroup)
        // console.log(groupExercises?.exercises)
        translateX.value = withTiming(0, {duration: 300})
        setGroupExercises(() => (
            {
                ...groupExercises,
                exercises: [...(groupExercises?.exercises || []), {id: uuidv4()}]
            }
        ))
        setExercisesNames(getExercisesNamesFromDB(activeGroup))
    }

    const updateFilledGroups = () => {
        setFilledGroups(
            getMuscleGroupsNamesWithExercisesForDay(String(selectedDay))
        )
    }

    return <>
        <SafeAreaView
            style={s.AddScreen}
        >
            <AddScreenHeader navigation={navigation} day={selectedDay}/>
            <View style={s.content}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1, justifyContent: "space-between"}}
                    keyboardShouldPersistTaps="handled"
                    ref={scrollRef}
                    directionalLockEnabled={true}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets={true}
                >
                    <MuscleGroupsSelection
                        onActive={(aG: string) => {
                            updateFilledGroups()
                            setActiveGroup(aG)
                        }}
                        activeGroup={activeGroup}
                        filledGroups={filledGroups}
                    />
                    <Animated.View style={animatedStyle}>
                        <View>
                            {groupExercises.exercises?.map((x: any) => (
                                <ExerciseCard
                                    key={x.id}
                                    exercisesNames={
                                        x?.exerciseName ? [{label: x.exerciseName, value: x.exerciseName}]
                                            :
                                            exercisesNames
                                                .filter((exerciseName) =>
                                                    !groupExercises.exercises.some((exercise: Exercise) => exercise.exerciseName === exerciseName)
                                                )
                                                .map((exerciseName) => ({label: exerciseName, value: exerciseName}))

                                    }
                                    exercise={x?.exerciseName ? x : null}
                                    day={selectedDay}
                                    reload={() => {
                                        reload()
                                    }}
                                    onDeleteExercise={(exerciseId) => {
                                        removeExerciseFromDB(groupExercises.id, exerciseId)
                                        setGroupExercises((prev: any) => ({
                                            ...prev,
                                            exercises: [...prev.exercises.filter((g: Exercise) => g.id !== x.id)]
                                        }))
                                    }}
                                    activeGroup={activeGroup}
                                />

                            ))
                            }
                        </View>
                        <ExerciseNameSection
                            ref={addExerciseSectionInputRef}
                            scrollRef={scrollRef}
                            activeGroup={activeGroup}
                            exerciseNames={exercisesNames}
                            reload={() => reload()}
                        />
                    </Animated.View>
                </ScrollView>
                <ChooseMuscleGroupTextAnimated refresh={activeGroup}/>
            </View>
        </SafeAreaView>

    </>
}


const s = StyleSheet.create({
    AddScreen: {
        flex: 1,
        backgroundColor: colors.black,
    },
    content: {
        flex: 1,
        padding: 5,
        paddingTop: 0
    }
})