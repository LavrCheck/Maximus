import React, {useEffect, useRef, useState} from "react"
import {Dimensions, Keyboard, ScrollView, StyleSheet, View} from "react-native"
import Modal from "react-native-modal"
import {colors} from "../../styles/colors"
import {MuscleGroupsSelection} from "./MuscleGroupsSelection"
import {HandleLine} from "./HandleLine"
import {AddExerciseSection} from "./AddExerciseSection"
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {ExerciseCard} from "./ExerciseCard.tsx";
import {ChooseMuscleGroup} from "./ChooseMuscleGroup.tsx";


export const AddModal = (
    {
        isModalShow,
        onClose,
        selectedDay
    }: {
        isModalShow: boolean
        onClose: () => void
        selectedDay: Date
    }) => {

    const [scrollOffset, setScrollOffset] = useState<number>(0)
    const [activeGroup, setActiveGroup] = useState<string>('')

    const scrollRef = useRef<ScrollView>(null)

    const translateX = useSharedValue(-Dimensions.get('window').width)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}],
        }
    })

    useEffect(() => {
        if (activeGroup) {
            translateX.value = withTiming(0, {duration: 250})
        }
    }, [activeGroup])

    useEffect(() => {
        setActiveGroup('')
        setScrollOffset(0)
        !isModalShow && (translateX.value = -Dimensions.get('window').width)
    }, [isModalShow]);


    return <>
        <Modal
            isVisible={isModalShow}
            swipeDirection={'down'}
            onSwipeComplete={onClose}
            onBackButtonPress={onClose}
            onSwipeStart={() => {
                Keyboard.dismiss()
            }}
            hideModalContentWhileAnimating={true}
            style={s.AddModal}
            hasBackdrop={true}
            onBackdropPress={onClose}
            propagateSwipe={true}
            scrollOffset={scrollOffset}
            scrollTo={(p) => {
                if (scrollRef.current && p.y !== 0) {
                    scrollRef.current.scrollTo(p)
                }
            }}
        >
            <View
                style={s.modalView}
            >
                <HandleLine day={selectedDay}/>
                <View style={{flex: 1, padding: 5}}>
                    <MuscleGroupsSelection onActive={(x) => setActiveGroup(x)}/>
                    <Animated.View style={[{flex: 1}, animatedStyle]}>
                        <ScrollView
                            contentContainerStyle={{justifyContent: "space-between", flexGrow: 1}}
                            keyboardShouldPersistTaps={'always'}
                            ref={scrollRef}
                            onScroll={(e) => setScrollOffset(e.nativeEvent.contentOffset.y)}
                        >
                            <ExerciseCard day={selectedDay} activeGroup={activeGroup}/>
                            <View></View>
                            <AddExerciseSection activeGroup={activeGroup}/>
                        </ScrollView>
                    </Animated.View>
                    <ChooseMuscleGroup refresh={activeGroup}/>
                </View>
            </View>
        </Modal>
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
        backgroundColor: colors.black,
    },
})