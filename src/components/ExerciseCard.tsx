import {StyleSheet, View} from "react-native";
import {colors} from "../../styles/colors.tsx";
import DropDownPicker from "react-native-dropdown-picker";
import {useEffect, useState} from "react";
import {SetSection} from "./SetSection.tsx";
import {getExercisesFromDB} from "../../realm.tsx";

export const ExerciseCard = (
    {
        activeGroup,
        day
    }: {
        activeGroup: string
        day: Date
    }) => {

    const [isDropDowOpen, setIsDropDowOpen] = useState(false)
    const [valueDropDow, setValueDropDow] = useState(null)
    const [dropDowItems, setDropDowItems] = useState<any[]>([])

    useEffect(() => {
        setDropDowItems(getExercisesFromDB(activeGroup).map((x) => ({label: x, value: x})))
    }, [activeGroup])


    return <>
        <View style={s.ExerciseCard}>
            <DropDownPicker
                setValue={setValueDropDow}
                value={valueDropDow}
                items={dropDowItems}
                setItems={setDropDowItems}
                open={isDropDowOpen}
                setOpen={setIsDropDowOpen}
                style={s.dropDown}
                labelStyle={{
                    textAlign: 'center',
                    color: colors.primary,
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: 2,
                }}
                textStyle={{color: colors.white, fontSize: 16}}
                dropDownContainerStyle={{backgroundColor: colors.darkGrey, borderWidth: 0 }}
                placeholder={'Select exercise...'}
                itemSeparator={true}
                showArrowIcon={!valueDropDow}
                disabled={Boolean(valueDropDow)}
                itemSeparatorStyle={{borderWidth: 1, borderBottomColor: 'rgba(128, 128, 128, 0.5)'}}
                placeholderStyle={{fontSize: 20, color: colors.lightGrey}}
            />
            { valueDropDow &&
                <SetSection/>
            }
        </View>
    </>
}

const s = StyleSheet.create({
    ExerciseCard: {
        backgroundColor: colors.darkGrey,
        // borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 15,
        marginVertical: 20,
        paddingVertical: 15,
    },
    dropDown: {
        backgroundColor: colors.darkGrey,
        color: colors.white,
        borderWidth: 0,
        padding: 0
    },
})