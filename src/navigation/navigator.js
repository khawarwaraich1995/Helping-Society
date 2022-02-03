import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgotPassword';
import BottomNav from '../navigation/bottomNav'
import RegisterComplaint from '../screens/complaints/registerComplaint'
import Profile from '../screens/Profile/Profile'
import SaveFood from '../screens/SaveFood/SaveFood';
import Donations from '../screens/Donation/Donations';
import ContactUs from '../screens/ContactUs/ContactUs';
import Splash from '../screens/Splash/Splash'

const Stack = createNativeStackNavigator();

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="RegisterComplaint" component={RegisterComplaint} />
                    <Stack.Screen name="Home" component={BottomNav} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="SaveFood" component={SaveFood} />
                    <Stack.Screen name="Donations" component={Donations} />
                    <Stack.Screen name="ContactUs" component={ContactUs} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator