import {StyleSheet, Text, TextInput, View} from "react-native";
import {colors} from "../../../../styles/colors.tsx";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import React, {useEffect} from "react";

export const SetInput = (
    {
        value,
        onChangeText,
        check,
        setCheck,
        isAdding
    }: {
        value: string;
        onChangeText: (x: string) => void
        check: boolean
        setCheck: () => void
        isAdding: boolean
    }
) => {

    const borderColor = useSharedValue('transparent')

    const animatedBorderStyle = useAnimatedStyle(() => {
        return {
            borderColor: borderColor.value,
            borderWidth: 1,
            borderRadius: 5,
            marginRight: 8,
        };
    });

    useEffect(() => {
        if (!value && check) {
            borderColor.value = withTiming(colors.white, {duration: 300}, () => {
                borderColor.value = withTiming('transparent', {duration: 300})
            })
            setCheck()
        }
    }, [check]);


    return <>
        <Animated.View style={animatedBorderStyle}>
            {isAdding ?
                <TextInput
                    style={[s.SetInput, {backgroundColor: colors.grey}]}
                    value={value}
                    onChangeText={(e) => {
                        const trimmedValue = e.replace(/\s+/g, '');
                        if ((Number(trimmedValue) < 1000 && trimmedValue.length <= 5) || trimmedValue === '') {
                            onChangeText(e);
                        }
                    }}
                    keyboardType="numeric"
                    cursorColor={colors.white}
                />
                :
                <View style={s.SetInput}>
                    <Text style={{color: colors.white, fontSize: 18, textAlign: 'center'}}>{value}</Text>
                </View>
            }
        </Animated.View>
    </>
}

const s = StyleSheet.create({
    SetInput: {
        height: 45,
        width: 60,
        backgroundColor: colors.black,
        color: colors.white,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5,
        justifyContent: 'center'
    }
})