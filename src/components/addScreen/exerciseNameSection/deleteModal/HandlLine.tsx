import {SvgXml} from "react-native-svg"
import horLine from '../../../../../images/horLine.svg'
import {StyleSheet, View} from "react-native"
import React from "react";
import {colors} from "../../../../../styles/colors.tsx";


export const HandleLine = () => {

    return <>
        <View style={s.HandleLine}>
            <SvgXml scaleX={3} xml={horLine}/>
        </View>
    </>
}

const s = StyleSheet.create({
    HandleLine: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: colors.grey,
    },
})