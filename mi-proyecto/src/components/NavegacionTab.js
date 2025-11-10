import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import NuevoPost from "../screens/NuevoPost"
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeMenu from "./HomeMenu"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';


const Tab = createBottomTabNavigator();

function NavegacionTab(){
    return(
    <Tab.Navigator>
        <Tab.Screen name= "HomeMenu" component={HomeMenu} options= {{   headerShown: false ,tabBarIcon: () => <Fontisto name="applemusic" size={24} color="black" /> }}/>
        <Tab.Screen name= "Profile" component= {Profile} options= {{   headerShown: false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" />}}/>
        <Tab.Screen name= "NuevoPost" component= {NuevoPost} options= {{   headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/>
    </Tab.Navigator>
)}

export default NavegacionTab;