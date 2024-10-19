import 'react-native-gesture-handler'
import * as React from 'react'
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {RootScreen} from './src/screens/RootScreen.tsx'
import {PaperProvider} from 'react-native-paper';
import 'react-native-vector-icons'
import {initDB, schemas} from './realm.tsx'
import {RealmProvider} from '@realm/react'
import {AddScreen} from "./src/screens/AddScreen.tsx";
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator()

function App() {

    React.useEffect(() => {
        initDB()
    }, [])

    return (
        <>
            <SafeAreaProvider>
                <RealmProvider schema={schemas}>
                    <PaperProvider>
                        <NavigationContainer>
                            <Stack.Navigator>
                                <Stack.Screen options={{headerShown: false}} name="root" component={RootScreen}/>
                                <Stack.Screen options={{
                                    headerShown: false,
                                    gestureEnabled: true,
                                    gestureDirection: 'horizontal',
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    presentation: 'transparentModal'
                                }} name="AddScreen" component={AddScreen}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    </PaperProvider>
                </RealmProvider>
            </SafeAreaProvider>
        </>
    )
}

export default App


