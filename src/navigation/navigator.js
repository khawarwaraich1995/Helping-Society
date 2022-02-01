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

const Stack = createNativeStackNavigator();

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false,animation:'slide_from_right' }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="RegisterComplaint" component={RegisterComplaint} />
                    <Stack.Screen name="Home" component={BottomNav} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="SaveFood" component={SaveFood} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator