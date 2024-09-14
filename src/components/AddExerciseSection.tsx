import { FlatList, Keyboard, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { colors } from "../../styles/colors"
import { useRef, useState } from "react"
import { Button } from "react-native-paper"
import { addExerciseToDB, getExercisesFromDB } from "../../realm"

export const AddExerciseSection = ({
    activeGroup
}: {
    activeGroup: string
}) => {

    const [inputExercise, setInputExercise] = useState<string>('')
    const inputRef = useRef<TextInput>(null)

    const onAddExercise = () => {
        if (inputRef.current && inputExercise === '') { inputRef.current.focus(); return }
        addExerciseToDB(activeGroup, inputExercise)
        console.log(getExercisesFromDB(activeGroup))
        Keyboard.dismiss()
        setInputExercise('')
    }

    return <>
        <View style={s.AddExerciseSection}>
            <TextInput
                value={inputExercise}
                onChangeText={(e) => setInputExercise(e)}
                placeholder="Enter the name of the exercise to add..."
                style={s.input}
                placeholderTextColor={'#7a7a7a'}
                ref={inputRef}
                onSubmitEditing={onAddExercise}
            />
            <View style={s.buttonsContainer}>
                <Button
                    mode="outlined"
                    style={{ minWidth: 170, minHeight: 40, borderColor: '#7a7a7a' }}
                    labelStyle={{ fontSize: 17, color: '#7a7a7a' }}
                    onPress={() => { }}
                    rippleColor="rgba(122, 122, 122, 0.15)"
                >Delete exercise</Button>
                <Button
                    mode="contained"
                    style={{ minWidth: 150, minHeight: 40, backgroundColor: colors.green }}
                    labelStyle={{ fontSize: 17 }}
                    onPress={onAddExercise}
                >Add exercise</Button>
            </View>
        </View>
    </>
}

const s = StyleSheet.create({
    AddExerciseSection: {
        height: 130,
        backgroundColor: colors.backgroundBlack,
        borderRadius: 15,
        marginBottom: 10,
        padding: 10,
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: '#2a2a2a',
        borderRadius: 15,
        color: colors.white,
        paddingHorizontal: 10,
        fontSize: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})