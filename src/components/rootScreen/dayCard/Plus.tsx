import {StyleSheet, View} from "react-native";
import {SvgXml} from "react-native-svg";
import plus from "../../../../images/plus.svg";
import React from "react";

export const Plus = () => {
    return <>
        <View style={s.plusContainer}>
            <SvgXml style={s.plus} xml={plus}/>
        </View>
    </>
}

const s = StyleSheet.create({
    plusContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus: {
        flexBasis: '90%',

    }
})