import Modal from 'react-native-modal'
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {colors} from "../../../../../styles/colors.tsx";
import {HandleLine} from "./HandlLine.tsx";
import {useEffect, useRef, useState} from "react";
import {IconButton} from "react-native-paper";
import {removeExerciseNameFromDB} from "../../../../../realm.tsx";

export const DeleteModal = (
    {
        isVisible,
        onHide,
        exerciseNames,
        activeGroup,
        reload
    }: {
        isVisible: boolean
        onHide: () => void
        exerciseNames: string[]
        activeGroup: string,
        reload: () => void
    }
) => {


    const scrollRef = useRef<ScrollView>(null)
    const [scrollOffset, setScrollOffset] = useState<number>(0)

    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        setHeight(0)
    }, [isVisible])


    return <>
        <Modal
            isVisible={isVisible}
            onModalHide={onHide}
            onSwipeComplete={onHide}
            swipeDirection={'down'}
            style={s.DeleteModal}
            backdropOpacity={0}
            hasBackdrop={true}
            onBackdropPress={onHide}
            onBackButtonPress={onHide}
            propagateSwipe={true}
            scrollOffset={scrollOffset}
            scrollTo={(p) => {
                if (scrollRef.current && p.y !== 0) {
                    scrollRef.current.scrollTo(p)
                }
            }}
        >
            <View style={s.content}>
                <HandleLine/>
                {exerciseNames.length === 0 &&
                    <View style={s.errorMessageContainer}>
                        <Text style={s.errorMessageText}>
                            There is nothing to delete!
                        </Text>
                    </View>
                }
                <ScrollView
                    ref={scrollRef}
                    onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={{height: (exerciseNames.length * 75) + height}}>
                        {exerciseNames?.map((x, i) => (
                            <View key={i} style={s.exerciseNameContainer}>
                                <Text
                                    style={s.exerciseName}
                                >{x}</Text>
                                <IconButton
                                    icon={'trash-can'}
                                    iconColor={colors.white}
                                    mode={'contained'}
                                    style={{backgroundColor: colors.red}}
                                    onPress={() => {
                                        removeExerciseNameFromDB(activeGroup, x)
                                        reload()
                                        setHeight(prev => prev + 75)
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>

            </View>
        </Modal>

    </>
}

const s = StyleSheet.create({
    DeleteModal: {
        margin: 0,
        display: "flex",
        justifyContent: "flex-end",
    },
    content: {
        backgroundColor: colors.darkGrey,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        width: '100%',
        minHeight: 150,
        maxHeight: '95%'
    },
    exerciseNameContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 75,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: colors.grey,
    },
    exerciseName: {
        fontSize: 22,
        color: colors.white,
    },
    errorMessageContainer: {
        position: 'absolute',
        top: 35,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageText: {
        color: colors.white,
        letterSpacing: 0.5,
        fontSize: 20,
    }
})