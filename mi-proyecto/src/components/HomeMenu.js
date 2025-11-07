import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import Comentario from "../screens/Comentario"


const Stack = createNativeStackNavigator()

function HomeMenu () {
  return (
    
     
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options= { {headerShown: false}}/>
          <Stack.Screen name="Comentario" component={Comentario} options= { {headerShown: false}}/>
        </Stack.Navigator>
      
   
  );
}
export default HomeMenu;