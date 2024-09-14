import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DayCard } from '../components/DayCard';
import { AddModal } from '../components/AddModal.tsx';
import { colors } from '../../styles/colors.tsx';
import { getWeek } from 'date-fns';

const getCurrentWeek = () => (getWeek(new Date()))

export const Root = () => {

    const [isAddModalShow, setIsAddModalShow] = useState<boolean>(true)

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
            >Week {getCurrentWeek()}</Text>
            <DayCard onPress={() => setIsAddModalShow(true)} />
            <DayCard onPress={() => setIsAddModalShow(true)} />
            <DayCard onPress={() => setIsAddModalShow(true)} />
            <DayCard onPress={() => setIsAddModalShow(true)} />
            <DayCard onPress={() => setIsAddModalShow(true)} />
            <DayCard onPress={() => setIsAddModalShow(true)} />
            <DayCard onPress={() => setIsAddModalShow(true)} />
        </SafeAreaView>
        <AddModal
            isModalShow={isAddModalShow}
            onClose={() => setIsAddModalShow(false)}
        />
    </>


}

const s = StyleSheet.create({
    Root: {
        backgroundColor: colors.backgroundGrey,
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})