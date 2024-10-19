import {StyleSheet, Text, View} from "react-native";
import {colors} from "../../../../styles/colors.tsx";
import {format} from "date-fns";
import React from "react";
import {InfoDayCard} from "../../../../types.tsx";

export const TextInfo = (
    {
        day,
        data
    }: {
        day: Date
        data: InfoDayCard
    }
) => {
    return <>
        <View style={s.TextInfo}>
            <Text style={s.weekDay}>{format(day, 'EEE')}</Text>
            {
                data &&
                <View>
                    <Text style={s.infoText}>
                        <Text style={s.bold}>{data.totalSets}</Text> {data.totalSets === 1 ? 'Set' : 'Sets'}
                    </Text>

                    <Text style={s.infoText}>
                        <Text style={s.bold}>{data.totalReps}</Text> {data.totalReps === 1 ? 'Rep' : 'Reps'}
                    </Text>
                </View>
            }
        </View>
    </>
}

const s = StyleSheet.create({
    TextInfo: {
        height: '100%',
        paddingVertical: 5,
        paddingStart: 10,
        justifyContent: 'space-between'
    },
    weekDay: {
        color: colors.white,
        fontSize: 16,
    },
    infoText: {
        color: colors.white,
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: '300'
    },
    bold: {
        fontWeight: '400',
    }
})