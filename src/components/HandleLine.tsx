import { SvgXml } from "react-native-svg"
import horLine from '../../images/horLine.svg'
import { StyleSheet, View } from "react-native"
import { useState } from "react"


export const HandleLine = () => {

    return <>
        <View style={s.HandleLine} >
            <SvgXml scaleX={3} xml={horLine} />
        </View>
    </>
}

const s = StyleSheet.create({
    HandleLine: {
        width: '100%',
        height: 35,
    }
})

