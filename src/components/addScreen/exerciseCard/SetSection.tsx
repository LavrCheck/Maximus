import {Keyboard, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {colors} from "../../../../styles/colors.tsx";
import {IconButton} from 'react-native-paper';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {SetInput} from "./SetInput.tsx";
import {addSetToExercise} from "../../../../realm.tsx";
import {RectButton, Swipeable} from "react-native-gesture-handler"


export const SetSection = (
    {
        exerciseId,
        data,
        refresh
    }: {
        exerciseId: string
        data: any
        refresh: () => void
    }
) => {

    const [reps, setReps] = useState('')
    const [kg, setKg] = useState('')

    const [isCheckReps, setIsCheckReps] = useState(false)
    const [isCheckKg, setIsCheckKg] = useState(false)

    const height = useSharedValue(90)


    useEffect(() => {
        if (data) {
            setReps(String(data.reps))
            setKg(String(data.kg))
        }
    }, [data])

    const onAddSet = () => {
        if (kg && reps) {
            addSetToExercise(exerciseId, Number(reps), Number(kg))
            setKg('')
            setReps('')
            refresh()
            Keyboard.dismiss()
            return
        }
        !reps && setIsCheckReps(true)
        !kg && setIsCheckKg(true)
    };

    const onRemoveSet = () => {
        height.value = withTiming(0, {duration: 300})
        refresh()
    };

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        overflow: 'hidden',
        backgroundColor: colors.darkGrey
    }));

    const renderRightActions = () => {
        return (
            <RectButton style={s.deleteButton} onPress={onRemoveSet}>
                <IconButton
                    icon="trash-can"
                    size={30}
                    iconColor={colors.white}
                />
            </RectButton>
        );
    };


    return <>
        <Animated.View
            style={[animatedStyle, !data && s.editableAnimatedStyle]}>
            <Swipeable
                renderRightActions={renderRightActions}
                containerStyle={{backgroundColor: colors.red, height: 50, marginVertical: 20}}
                enabled={Boolean(data)}
            >
                <View style={s.SetSection}>
                    <View style={s.inputContainer}>
                        <SetInput
                            value={reps}
                            onChangeText={(e) => setReps(e)}
                            check={isCheckReps}
                            setCheck={() => setIsCheckReps(!isCheckReps)}
                            isAdding={!data}
                        />

                        <Text style={s.text}>Reps</Text>
                    </View>
                    <View style={s.inputContainer}>
                        <SetInput
                            value={kg}
                            onChangeText={(e) => setKg(e)}
                            check={isCheckKg}
                            setCheck={() => setIsCheckKg(false)}
                            isAdding={!data}
                        />
                        <Text style={s.text}>Kg</Text>
                    </View>
                    {!data &&
                        <IconButton
                            mode={'contained'}
                            icon="arrow-up"
                            size={23}
                            style={{
                                position: 'absolute',
                                right: 15,
                                backgroundColor: colors.primary
                            }}
                            iconColor={colors.white}
                            onPress={onAddSet}
                        />
                    }
                </View>
            </Swipeable>
        </Animated.View>

    </>
}

const s = StyleSheet.create({
    SetSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: 50,
        backgroundColor: colors.darkGrey
    },
    editableAnimatedStyle: {
        borderTopWidth: 1,
        borderColor: colors.grey,
        marginHorizontal: 10,
        marginBottom: -15
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    text: {
        color: colors.lightGrey,
        fontSize: 18
    },
    deleteButton: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
})