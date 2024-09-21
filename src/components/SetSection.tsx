import {StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {colors} from "../../styles/colors.tsx";
import {Button} from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

export const SetSection = () => {

    const [reps, setReps] = useState('')
    const [kg, setKg] = useState('')
    const [isDone, setIsDone] = useState(false)

    return <>
        <View style={s.SetSection}>
            <View style={{flexDirection: 'row'}}>
                <View style={s.inputContainer}>
                    <TextInput
                        style={s.input}
                        value={reps}
                        onChangeText={(e) => {
                            if ((Number(e) < 1000 && e.length <= 5) || e === '') {
                                setReps(e)
                            }
                        }}
                        keyboardType="numeric"
                        cursorColor={colors.white}
                    />
                    <Text style={s.text}>Reps</Text>
                </View>
                <View style={s.inputContainer}>
                    <TextInput
                        style={s.input}
                        value={kg}
                        onChangeText={(e) => {
                            if ((Number(e) < 1000 && e.length <= 5) || e === '') {
                                setKg(e)
                            }
                        }}
                        keyboardType="numeric"
                        cursorColor={colors.white}
                    />
                    <Text style={s.text}>Kg</Text>
                </View>
            </View>
            <IconButton
                mode={isDone ? 'contained' : 'outlined'}
                icon="check"
                size={23}
                style={isDone ? s.done : s.notDone}
                iconColor={isDone ? colors.white : colors.primary}
                onPress={() => setIsDone(!isDone)}
            />
        </View>
    </>
}

const s = StyleSheet.create({
    SetSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    input: {
        height: 45,
        width: 60,
        backgroundColor: colors.grey,
        marginRight: 8,
        color: colors.white,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5
    },
    text: {
        color: colors.lightGrey,
        fontSize: 18
    },
    done: {
        backgroundColor: colors.primary,
    },
    notDone: {
        borderColor: colors.primary
    }
})