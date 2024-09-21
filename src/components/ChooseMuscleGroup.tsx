import {colors} from "../../styles/colors.tsx";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import React, {useEffect} from "react";
import {Dimensions, StyleSheet, Text} from "react-native";

export const ChooseMuscleGroup = (
    {
        refresh
    }: {
        refresh: string
    }
) => {

    const translateX = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}],
        }
    })

    useEffect(() => {
        if (refresh) {
            translateX.value = withTiming(Dimensions.get('window').width, {duration: 250})
        }
    }, [refresh])

    return <>
        <Animated.View style={[s.ChooseMuscleGroup, animatedStyle]}>
            <Text style={s.text}>Choose muscle group</Text>
        </Animated.View>
    </>
}

const s = StyleSheet.create({
    ChooseMuscleGroup: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
    },
    text: {
        color: colors.lightGrey,
        textAlign: 'center',
        fontSize: 28
    }
})