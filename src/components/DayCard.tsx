import React, { useRef, useEffect, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import plus from '../../images/plus.svg'
import { colors } from "../../styles/colors";



export const DayCard = ({
    onPress
} : {
    onPress: () => void
}) => {

    return <>
        <TouchableOpacity style={s.DayCard} onPress={onPress}>
            <View>
                <SvgXml style={s.plus} xml={plus} />
            </View>
        </TouchableOpacity>
    </>
}

const s = StyleSheet.create({
    DayCard: {
        width: '100%',
        height: '12%',
        borderRadius: 15,
        borderColor: colors.grey,
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus: {
        flexBasis: '90%'
    }
})