import {Pressable, StyleSheet, View} from "react-native"
import React from "react"
import hand from '../../../images/hand.svg'
import {SvgXml} from "react-native-svg"
import {colors} from "../../../styles/colors.tsx"
import leg from '../../../images/leg.svg'
import back from '../../../images/back.svg'
import shoulder from '../../../images/shoulder.svg'
import chest from '../../../images/chest.svg'

export const muscleGroups = [
    {image: hand, name: 'hands'},
    {image: leg, name: 'legs'},
    {image: back, name: 'back'},
    {image: shoulder, name: 'shoulders'},
    {image: chest, name: 'chest'}
]


export const MuscleGroupsSelection = (
    {
        onActive,
        filledGroups,
        activeGroup
    }: {
        onActive: (x: string) => void
        activeGroup: string
        filledGroups: string[]
    }) => {


    return <>
        <View style={s.MuscleGroupsSelection}>
            {muscleGroups.map((x, i) => (
                <Pressable
                    key={i}
                    style={[
                        s.muscleGroupUnit,
                        x.name === activeGroup ? s.active :
                            filledGroups?.includes(x.name) && s.filled
                    ]}
                    onPress={() => {
                        onActive(x.name)
                    }}
                >
                    <SvgXml width={'90%'} height={'90%'} xml={x.image}/>
                </Pressable>
            ))}
        </View>
    </>
}

const s = StyleSheet.create({
    MuscleGroupsSelection: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    muscleGroupUnit: {
        flexBasis: '18%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grey,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: colors.grey
    },
    active: {
        borderColor: colors.white,
    },
    filled: {
        borderColor: colors.lightGrey,
        borderWidth: 1,
        padding: 1
    }
})