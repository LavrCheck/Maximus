import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import hand from '../../images/hand.svg'
import { SvgXml } from "react-native-svg"
import { colors } from "../../styles/colors"
import leg from '../../images/leg.svg'
import back from '../../images/back.svg'
import shoulder from '../../images/shoulder.svg'
import chest from '../../images/chest.svg'

const muscleGroups = [
    { image: hand, name: 'hands' },
    { image: leg, name: 'legs' },
    { image: back, name: 'back' },
    { image: shoulder, name: 'shoulders' },
    { image: chest, name: 'chest' }
]


export const MuscleGroupsSelection = ({
    onActive
}: {
    onActive: (x: string) => void
}) => {

    const [activeGroup, setActiveGroup] = useState<string | null>(null)

    return <>
        <View style={s.MuscleGroupsSelection}>
            {muscleGroups.map((x, i) => (
                <Pressable
                    key={i}
                    style={[s.muscleGroupUnit, x.name === activeGroup && s.active]}
                    onPress={() => { setActiveGroup(x.name); onActive(x.name) }}
                >
                    <SvgXml width={'90%'} height={'90%'} xml={x.image} />
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
    },
    muscleGroupUnit: {
        flexBasis: '18%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundBlack,
        padding: 2
    },
    active: {
        borderStyle: 'solid',
        borderColor: colors.white,
        borderWidth: 2,
        padding: 0
    }
})