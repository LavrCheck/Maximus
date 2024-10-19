import React, {useCallback, useState} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../../../styles/colors.tsx";
import {getExercisesInfoForDay} from "../../../../realm.tsx";
import {InfoDayCard} from "../../../../types.tsx";
import {TextInfo} from "./TextInfo.tsx";
import {Plus} from "./Plus.tsx";
import {ImageInfo} from "./ImageInfo.tsx";
// @ts-ignore
import {useFocusEffect} from '@react-navigation/native';

export const DayCard = (
    {
        onPress,
        day
    }: {
        onPress: () => void
        day: Date
    }) => {

    const [data, setData] = useState<InfoDayCard>(null)
    useFocusEffect(
        useCallback(() => {
            setData(
                getExercisesInfoForDay(String(day))
            );
        }, [day])
    );

    return <>
        <TouchableOpacity
            style={s.DayCard}
            onPress={onPress}
            activeOpacity={0.5}
        >
            <TextInfo
                day={day}
                data={data}
            />

            {data ? <ImageInfo data={data}/> : <Plus/>}
        </TouchableOpacity>
    </>
}

const s = StyleSheet.create({
    DayCard: {
        width: '100%',
        height: '11%',
        borderRadius: 15,
        borderColor: colors.grey,
        borderWidth: 1,
        flexDirection: 'row',
        borderStyle: 'solid',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.darkGrey,
    },
})