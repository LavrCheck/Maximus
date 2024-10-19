import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {format} from "date-fns";
import React from "react";
import {colors} from "../../../styles/colors.tsx";
import Icon from 'react-native-vector-icons/Entypo';


export const AddScreenHeader = (
    {
        day,
        navigation
    }: {
        day: Date
        navigation: any
    }) => {

    return <>
        <View style={s.Header}>
            <TouchableOpacity
                style={s.backButton}
                onPress={() => {
                    Keyboard.dismiss();
                    navigation.goBack()
                }}
                activeOpacity={0.5}
            >
                <Icon name="chevron-left" size={24} color={colors.primary}/>
                <Text style={s.backText}>Back</Text>
            </TouchableOpacity>
            <View style={s.weekDayContainer}>
                <Text style={s.weekDay}>{format(day, 'EEEE')}</Text>
            </View>
            <Text style={s.monthDay}>{format(day, 'dd MMM')}</Text>
        </View>
    </>
}

const s = StyleSheet.create({
    Header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    weekDayContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    weekDay: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 0.5,
    },
    monthDay: {
        color: colors.lightGrey,
        fontSize: 17,
        marginRight: 10
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: colors.primary,
        fontSize: 20,
        letterSpacing: 0.5,
    }
})

