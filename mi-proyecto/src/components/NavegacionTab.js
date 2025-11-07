import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import NuevoPost from "../screens/NuevoPost"
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeMenu from "./HomeMenu"


const Tab= createBottomTabNavigator();

export default function NavegacionTab(){
    return(
    <Tab.Navigator>
        <Tab.Screen name= "HomeMenu" component={HomeMenu} options= {{   headerShown: false ,tabBarIcon: () => <AntDesign name="bilibili" size={24} color="black" /> }}/>
        <Tab.Screen name= "Profile" component= {Profile} options= {{   headerShown: false}}/>
        <Tab.Screen name= "NuevoPost" component= {NuevoPost} options= {{   headerShown: false}}/>
    </Tab.Navigator>
)}