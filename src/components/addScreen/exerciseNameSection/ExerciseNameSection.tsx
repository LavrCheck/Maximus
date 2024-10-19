import React, {forwardRef, useState} from "react";
import {Keyboard, ScrollView, StyleSheet, TextInput, View} from "react-native";
import {Button} from "react-native-paper";
import {colors} from "../../../../styles/colors.tsx";
import {addExerciseNameToDB} from "../../../../realm.tsx";
import {DeleteModal} from "./deleteModal/DeleteModal.tsx";

type AddExerciseSectionProps = {
    activeGroup: string
    scrollRef: React.RefObject<ScrollView>
    exerciseNames: string[]
    reload: () => void
}

export const ExerciseNameSection = forwardRef<TextInput, AddExerciseSectionProps>(
    ({activeGroup, scrollRef, exerciseNames, reload}, ref) => {

        const [inputExercise, setInputExercise] = useState<string>('');
        const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

        const onAddExercise = () => {
            if (inputExercise === '') {
                if (ref && 'current' in ref && ref.current) {
                    ref.current.focus()
                }
                return
            }
            addExerciseNameToDB(activeGroup, inputExercise.charAt(0).toUpperCase() + inputExercise.slice(1))
            reload()
            Keyboard.dismiss()
            setInputExercise('')
        }

        return <>

            <View style={s.AddExerciseSection}>
                <TextInput
                    value={inputExercise}
                    onChangeText={setInputExercise}
                    placeholder="Enter the name of the exercise to add..."
                    style={s.input}
                    placeholderTextColor={colors.lightGrey}
                    ref={ref}
                    onSubmitEditing={onAddExercise}
                    cursorColor={colors.white}
                    onFocus={() => {
                        scrollRef.current?.scrollToEnd();
                    }}
                    onPressIn={() => {
                        scrollRef.current?.scrollToEnd();
                    }}
                />
                <View style={s.buttonsContainer}>
                    <Button
                        mode="outlined"
                        style={{minWidth: 170, minHeight: 40, borderColor: colors.lightGrey}}
                        labelStyle={{fontSize: 17, color: colors.lightGrey}}
                        onPress={() => {
                            setIsDeleteModalVisible(true)
                        }}
                    >
                        Delete name
                    </Button>
                    <Button
                        mode="contained"
                        style={{minWidth: 150, minHeight: 40, backgroundColor: colors.primary}}
                        labelStyle={{fontSize: 17}}
                        onPress={onAddExercise}
                    >
                        Add name
                    </Button>
                </View>
            </View>

            <DeleteModal
                isVisible={isDeleteModalVisible}
                onHide={() => setIsDeleteModalVisible(false)}
                activeGroup={activeGroup}
                exerciseNames={exerciseNames}
                reload={() => reload()}
            />
        </>
    }
);

const s = StyleSheet.create({
    AddExerciseSection: {
        height: 130,
        backgroundColor: colors.darkGrey,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 50,
        padding: 10,
        justifyContent: 'space-between',
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