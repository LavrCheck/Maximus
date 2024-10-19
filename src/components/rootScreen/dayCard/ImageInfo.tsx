import {StyleSheet, View} from "react-native";
import {InfoDayCard} from "../../../../types.tsx";
import {SvgXml} from "react-native-svg";
import React from "react";
import {muscleGroups} from "../../addScreen/MuscleGroupsSelection.tsx";

export const ImageInfo = (
    {
        data
    }: {
        data: InfoDayCard
    }
) => {
    return <>
        <View style={s.ImageInfo}>
            {data?.muscleGroups.map((groupName, i) => (
                <View
                    key={i}
                    style={s.svgContainer}
                >
                    <SvgXml
                        height={'100%'}
                        width={'100%'}
                        xml={muscleGroups.find(group => group.name === groupName)?.image}
                    />
                </View>
            ))}
        </View>
    </>
}

const s = StyleSheet.create({
    ImageInfo: {
        // backgroundColor: colors.white,
        flex: 1,
        padding: 10,
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    svgContainer: {
        width: '16%',
        marginHorizontal: 5,
        // backgroundColor: colors.white
    }
})