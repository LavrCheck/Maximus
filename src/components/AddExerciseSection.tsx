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
        addExerciseToDB(activeGroup, inputExercise.charAt(0).toUpperCase() + inputExercise.slice(1))
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
                placeholderTextColor={colors.lightGrey}
                ref={inputRef}
                onSubmitEditing={onAddExercise}
                cursorColor={colors.white}
            />
            <View style={s.buttonsContainer}>
                <Button
                    mode="outlined"
                    style={{ minWidth: 170, minHeight: 40, borderColor: colors.lightGrey }}
                    labelStyle={{ fontSize: 17, color: colors.lightGrey }}
                    onPress={() => { }}
                    rippleColor="rgba(122, 122, 122, 0.43)"
                >Delete exercise</Button>
                <Button
                    mode="contained"
                    style={{ minWidth: 150, minHeight: 40, backgroundColor: colors.primary }}
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
        backgroundColor: colors.darkGrey,
        borderRadius: 15,
        marginBottom: 10,
        padding: 10,
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: colors.grey,
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