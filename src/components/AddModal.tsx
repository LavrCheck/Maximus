import React, { useEffect, useRef, useState } from "react"
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"
import Modal, { Direction } from "react-native-modal"
import { colors } from "../../styles/colors"
import { MuscleGroupsSelection } from "./MuscleGroupsSelection"
import { HandleLine } from "./HandleLine"
import { AddExerciseSection } from "./AddExerciseSection"
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";



export const AddModal = ({
    isModalShow,
    onClose
}: {
    isModalShow: boolean
    onClose: () => void
}) => {

    const [scrollOffset, setScrollOffset] = useState<number>(0)
    const [activeGroup, setActiveGroup] = useState<string | null>(null)

    const scrollRef = useRef<ScrollView>(null)

    const translateX = useSharedValue(-Dimensions.get('window').width)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        }
    })
    useEffect(() => {
        if (activeGroup) {
            translateX.value = withTiming(0, { duration: 250 })
        }
    }, [activeGroup])

    return <>
        <Modal
            isVisible={isModalShow}
            swipeDirection={'down'}
            onSwipeComplete={onClose}
            onBackButtonPress={onClose}
            onSwipeStart={() => { Keyboard.dismiss() }}
            hideModalContentWhileAnimating={true}
            style={s.AddModal}
            hasBackdrop={true}
            onBackdropPress={onClose}
            propagateSwipe={true}
            scrollOffset={scrollOffset}
            scrollTo={(p) => { if (scrollRef.current) { scrollRef.current.scrollTo(p) } }}
        >
            <View
                style={s.modalView}
            >
                <View style={{ flex: 1 }} >
                    <HandleLine />
                    <MuscleGroupsSelection onActive={(x) => setActiveGroup(x)} />
                    {activeGroup &&
                        <Animated.View style={[{ flex: 1 }, animatedStyle]}> 
                            <ScrollView
                                contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1 }}
                                keyboardShouldPersistTaps={'always'}
                                ref={scrollRef}
                                onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
                            >

                                <View style={{height: 800, backgroundColor: '#f2f2'}}></View>
                                <AddExerciseSection activeGroup={activeGroup ?? ''} />

                            </ScrollView>
                        </Animated.View> 
                    } 
                </View>
            </View>
        </Modal >
    </>
}

const s = StyleSheet.create({
    AddModal: {
        padding: 0,
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalView: {
        flex: 1,
        marginTop: 40,
        borderRadius: 15,
        backgroundColor: colors.backgroundGrey,
        padding: 5,
    },
})