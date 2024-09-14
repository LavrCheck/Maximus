import 'react-native-gesture-handler'
import * as React from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Root } from './src/screens/Root.tsx'
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import 'react-native-vector-icons'
import { initDB, schemas } from './realm.tsx'
import { RealmProvider } from '@realm/react'


const Stack = createStackNavigator()


function App() {

  React.useEffect(() => {
    initDB()
  }, [])

  return (
    <RealmProvider schema={schemas}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="root" component={Root} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RealmProvider>
  );
}

export default App
