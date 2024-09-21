import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {SvgXml} from "react-native-svg";
import plus from '../../images/plus.svg'
import {colors} from "../../styles/colors";
import {format} from "date-fns";


export const DayCard = ({
                            onPress,
                            day
                        }: {
    onPress: () => void
    day: Date
}) => {

    return <>
        <TouchableOpacity style={s.DayCard} onPress={onPress}>
            <Text style={s.weekDay}>{format(day, 'EEE')}</Text>
            <SvgXml style={s.plus} xml={plus}/>
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
        alignItems: 'center',
        backgroundColor: colors.darkGrey,
    },
    plus: {
        flexBasis: '90%'
    },
    weekDay: {
        color: colors.white,
        position: "absolute",
        top: 5,
        left: 10,
        fontSize: 16,
        fontWeight: '300'
    }
})