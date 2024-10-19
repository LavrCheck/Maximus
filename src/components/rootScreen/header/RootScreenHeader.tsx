import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../../styles/colors.tsx";
import {format} from "date-fns";
import React, {useState} from "react";
import {IconButton} from "react-native-paper";
import {HeaderCalendar} from "./HeaderCalendar.tsx";

export const RootScreenHeader = (
    {
        weekDays,
        onPreviousWeek,
        onNextWeek,
        onChooseCalendarDay
    }: {
        weekDays: Date []
        onPreviousWeek: () => void
        onNextWeek: () => void
        onChooseCalendarDay: (x: Date) => void,
    }) => {

    const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false)

    return <>
        <View style={s.RootScreenHeader}>
            <IconButton
                mode={'contained'}
                icon="chevron-left"
                size={20}
                iconColor={colors.white}
                style={s.buttons}
                onPress={() => {
                    onPreviousWeek()
                }}
            />
            <TouchableOpacity
                onPress={() => setIsCalendarVisible(!isCalendarVisible)}
            >
                <Text
                    style={s.text}
                >{`${format(weekDays[0], 'dd')} - ${format(weekDays[6], 'dd MMM')}`}</Text>
            </TouchableOpacity>

            <IconButton
                mode={'contained'}
                icon="chevron-right"
                size={20}
                iconColor={colors.white}
                style={s.buttons}
                onPress={() => {
                    onNextWeek()
                }}
            />
        </View>

        <HeaderCalendar
            isVisible={isCalendarVisible}
            onClose={() => setIsCalendarVisible(false)}
            onChoose={(day: Date) => onChooseCalendarDay(day)}
        />

    </>
}

const s = StyleSheet.create({
    RootScreenHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    },
    buttons: {
        backgroundColor: colors.darkGrey
    },

})