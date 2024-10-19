import {StyleSheet, View} from "react-native";
import {colors} from "../../../../styles/colors.tsx";
import React, {useEffect, useState} from "react";
import {SetSection} from "./SetSection.tsx";
import {addExerciseToDB, getSetsByExerciseId, removeSetFromExercise} from "../../../../realm.tsx";
import {GestureHandlerRootView, PanGestureHandler, RectButton, Swipeable} from "react-native-gesture-handler";
import {Set} from '../../../../types.tsx'
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {DropDown} from "./DropDown.tsx";
import {IconButton} from "react-native-paper";

export const ExerciseCard = (
    {
        activeGroup,
        day,
        exercise,
        exercisesNames,
        reload,
        onDeleteExercise
    }: {
        activeGroup?: string
        day?: Date
        exercisesNames: any[]
        exercise: any
        reload: () => void
        onDeleteExercise: (x: string) => void
    }) => {

    const [valueDropDown, setValueDropDown] = useState<string | undefined>(exercise?.exerciseName)
    const [sets, setSets] = useState<Set[]>(exercise && getSetsByExerciseId(exercise?.id))
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

    const setsHeight = useSharedValue(0)
    const animatedSetsHeightStyle = useAnimatedStyle(() => ({
        height: setsHeight.value,
    }))


    useEffect(() => {
        if (isFirstRender) {
            setsHeight.value = sets?.length * 90
            setIsFirstRender(false)
        } else {
            setsHeight.value = withTiming(sets?.length * 90, {duration: 300})
        }
    }, [sets])

    const renderRightActions = () => {
        return (
            <RectButton
                style={s.reactButton}
                onPress={() => {
                    onDeleteExercise(exercise.id)
                }}>
                <IconButton
                    icon="trash-can"
                    size={30}
                    iconColor={colors.white}
                />
            </RectButton>
        );
    };


    return <>
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={renderRightActions}
                containerStyle={[s.swipeableContainer]}
                enabled={Boolean(valueDropDown)}
            >
                <Animated.View style={s.ExerciseCard}>

                    <DropDown
                        options={exercisesNames}
                        value={valueDropDown}
                        onSelect={(x) => {
                            setValueDropDown(x)
                            addExerciseToDB(String(day), activeGroup || '', x || '')
                            reload()
                        }}
                    />
                    <PanGestureHandler activeOffsetX={[-10, 10]}>
                        <View>
                            {valueDropDown && <>
                                <Animated.View style={animatedSetsHeightStyle}>
                                    {sets.length > 0 &&
                                        sets.map((x: Set) => (
                                            <SetSection
                                                key={x.id}
                                                exerciseId={exercise.id}
                                                data={x}
                                                refresh={() => {
                                                    removeSetFromExercise(exercise.id, x.id)
                                                    setsHeight.value = withTiming(setsHeight.value - 90, {duration: 300})
                                                }}
                                            />
                                        ))
                                    }
                                </Animated.View>
                                <SetSection
                                    exerciseId={exercise?.id}
                                    data={null}
                                    refresh={() => {
                                        setSets(getSetsByExerciseId(exercise.id))
                                    }}
                                />
                            </>}
                        </View>
                    </PanGestureHandler>
                </Animated.View>
            </Swipeable>
        </GestureHandlerRootView>
    </>
}


const s = StyleSheet.create({
    ExerciseCard: {
        backgroundColor: colors.darkGrey,
        borderRadius: 20,
        paddingVertical: 15,
    },
    reactButton: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeableContainer: {
        marginVertical: 15,
        borderRadius: 20,
        backgroundColor: colors.red,
    }
})