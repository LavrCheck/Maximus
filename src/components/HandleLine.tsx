import {SvgXml} from "react-native-svg"
import horLine from '../../images/horLine.svg'
import {StyleSheet, Text, View} from "react-native"
import {format} from "date-fns";
import React from "react";
import {colors} from "../../styles/colors.tsx";


export const HandleLine = (
    {
        day
    }: {
        day: Date
    }) => {

    return <>
        <View style={s.HandleLine}>
            <Text style={s.weekDay}>{format(day, 'EEE')}</Text>
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
        backgroundColor: colors.darkGrey,
        marginBottom: 10
    },
    weekDay: {
        color: colors.lightGrey,
        position: "absolute",
        top: 5,
        left: 10,
        fontSize: 18,
        fontWeight: "500",
        letterSpacing: 0.5
    }
})

