import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Calendar} from "react-native-calendars";
import {colors} from "../../../../styles/colors.tsx";
import React, {useEffect, useState} from "react";
import {getAllDaysWithExercises} from "../../../../realm.tsx";


const today = () => {
    const localDate = new Date()
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset())
    return localDate.toISOString().split('T')[0]
}

export const HeaderCalendar = (
    {
        isVisible,
        onClose,
        onChoose
    }: {
        isVisible: boolean
        onClose: () => void
        onChoose: (x: Date) => void
    }
) => {


    const [daysWithExercises, setDaysWithExercises] = useState<any[]>([])

    useEffect(() => {
        setDaysWithExercises(getAllDaysWithExercises())
    }, [])

    const markedDates = daysWithExercises.reduce((acc, date) => {
        acc[date] = {
            selected: true,
            selectedColor: colors.grey,
            selectedTextColor: colors.white,
        };
        return acc;
    }, {} as { [key: string]: { selected?: boolean, selectedColor?: string, selectedTextColor?: string } })

    if (markedDates[today()]) {
        markedDates[today()] = {
            selected: true,
            selectedTextColor: colors.white,
            selectedColor: colors.primary,
        }
    }

    if (!isVisible) {
        return <></>
    }

    return <>
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={s.overlay}>
                <Calendar
                    style={s.HeaderCalendar}
                    onDayPress={(day) => {
                        onClose()
                        onChoose(new Date(day.timestamp))
                    }}
                    markedDates={markedDates}
                    theme={{
                        monthTextColor: colors.white,
                        dayTextColor: colors.white,
                        todayTextColor: colors.primary,
                        textDisabledColor: colors.lightGrey,
                        arrowColor: colors.primary,
                        calendarBackground: colors.black,
                    }}
                    firstDay={1}
                />
            </View>
        </TouchableWithoutFeedback>
    </>
}

const s = StyleSheet.create({
    overlay: {
        position: 'absolute',
        marginTop: 60,
        zIndex: 1,
        height: '100%',
        width: Dimensions.get('window').width,
        backgroundColor: 'transparent',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    HeaderCalendar: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lightGrey,
        borderStyle: 'solid'
    }
})