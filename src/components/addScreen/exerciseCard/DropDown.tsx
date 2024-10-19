import {Divider, Headline, TouchableRipple} from "react-native-paper";
import {colors} from "../../../../styles/colors.tsx";
import {StyleSheet, TextInput, TouchableOpacity,} from "react-native";
import {Dropdown} from "react-native-paper-dropdown";
import React from "react";

export const DropDown = (
    {
        options,
        value,
        onSelect,
    }: {
        options: any[]
        value: string | undefined
        onSelect: (value: string | undefined) => void
    }) => {
    return <>
        <Dropdown
            CustomDropdownInput={({
                                      selectedLabel,
                                  }) => (
                <TextInput
                    style={[s.textInput, value && s.activeTextInput]}
                    placeholder={'Select exercise...'}
                    placeholderTextColor={colors.lightGrey}
                    value={selectedLabel}
                />
            )}
            CustomDropdownItem={({
                                     option,
                                     onSelect,
                                     toggleMenu,
                                     isLast,
                                 }) => (
                <>
                    <TouchableRipple
                        onPress={() => {
                            if (options.length > 0) {
                                onSelect?.(option.value)
                                toggleMenu()
                            }
                        }}
                        rippleColor={'rgba(255, 255, 255, 0.01)'}
                        style={s.touchableRipple}

                    >
                        <Headline
                            style={{
                                color: colors.white,
                                fontSize: 18,
                                height: 40
                            }}
                        >
                            {option.label}
                        </Headline>
                    </TouchableRipple>
                    {!isLast && <Divider style={{backgroundColor: colors.lightGrey, height: 1}}/>}
                </>

            )}
            options={options.length > 0 ? options : [{label: "There are no exercise names left!", value: null}]}
            value={value}
            onSelect={(x) => onSelect(x)}
            menuContentStyle={s.menuContent}
            hideMenuHeader={true}
            Touchable={TouchableOpacity}
            disabled={Boolean(value)}
        />
    </>
}

const s = StyleSheet.create({
    textInput: {
        width: '100%',
        backgroundColor: colors.darkGrey,
        fontSize: 22,
        color: colors.white,
        paddingHorizontal: 15,
    },
    activeTextInput: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
        letterSpacing: 2
    },
    touchableRipple: {
        backgroundColor: colors.darkGrey,
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    menuContent: {
        marginTop: 10,
        marginLeft: 3,
        marginRight: -3,
        backgroundColor: colors.darkGrey,
        borderRadius: 20
    }
})