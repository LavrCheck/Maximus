import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {DayCard} from '../components/DayCard';
import {AddModal} from '../components/AddModal.tsx';
import {colors} from '../../styles/colors.tsx';
import {addDays, format, startOfWeek} from 'date-fns';

const weekDays = Array.from({length: 7}, (_, i) => addDays(startOfWeek(new Date(), {weekStartsOn: 1}), i))


export const Root = () => {

    const [isAddModalShow, setIsAddModalShow] = useState<boolean>(false)
    const [selectedDay, setSelectedDay] = useState<Date>(new Date())

    return <>
        <SafeAreaView style={s.Root}>
            <Text
                style={{
                    color: colors.white,
                    margin: 0,
                    padding: 0,
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600'
                }}
            >{`${format(weekDays[0], 'dd')} - ${format(weekDays[6], 'dd MMM')}`}</Text>
            {weekDays.map((day, i) => (
                <DayCard
                    key={i}
                    day={day}
                    onPress={() => {
                        setSelectedDay(day);
                        setIsAddModalShow(true)
                    }}
                />
            ))}
        </SafeAreaView>
        <AddModal
            isModalShow={isAddModalShow}
            onClose={() => setIsAddModalShow(false)}
            selectedDay={selectedDay}
        />
    </>


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