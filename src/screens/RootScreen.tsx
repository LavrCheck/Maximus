import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {DayCard} from '../components/rootScreen/dayCard/DayCard.tsx';
import {colors} from '../../styles/colors.tsx';
import {addDays, startOfWeek} from 'date-fns';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootScreenHeader} from "../components/rootScreen/header/RootScreenHeader.tsx";


const getWeekDays = (startDate: Date) => {
    return Array.from({length: 7}, (_, i) => {
        const date = addDays(startDate, i)
        date.setHours(0, 0, 0, 0)
        return date
    });
};

export const RootScreen = ({navigation}: any) => {

    const [weekDays, setWeekDays] = useState(
        getWeekDays(startOfWeek(new Date(), {weekStartsOn: 1}))
    )


    return (
        <SafeAreaView
            style={s.Root}>
            <RootScreenHeader
                weekDays={weekDays}
                onNextWeek={() => setWeekDays(getWeekDays(addDays(weekDays[0], 7)))}
                onPreviousWeek={() => setWeekDays(getWeekDays(addDays(weekDays[0], -7)))}
                onChooseCalendarDay={(day: Date) =>
                    setWeekDays(getWeekDays(startOfWeek(day, {weekStartsOn: 1})))
                }
            />
            {weekDays.map((day, i) => (
                <DayCard
                    key={i}
                    day={day}
                    onPress={() => {
                        navigation.navigate('AddScreen', {selectedDay: String(day),});
                    }}
                />
            ))}
        </SafeAreaView>
    )


}

const s = StyleSheet.create({
    Root: {
        backgroundColor: colors.black,
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})