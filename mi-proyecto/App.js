import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "./src/screens/Login"
import Register from "./src/screens/Register"
import NavegacionTab from "./src/components/NavegacionTab"
import Comentario from "./src/screens/Comentario"


const Stack = createNativeStackNavigator()

function App() {
  return (
  
      <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="Register" component={Register} options= { {headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options= { {headerShown: false}}/>
          <Stack.Screen name="NavegacionTab" component={NavegacionTab} options= { {headerShown: false}}/>
          <Stack.Screen name="Comentario" component={Comentario} options= { {headerShown: false}}/>
          
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}

export default App;