import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgotPassword';
import BottomNav from '../navigation/bottomNav'
import RegisterComplaint from '../screens/complaints/registerComplaint'

const Stack = createNativeStackNavigator();

class Navigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="RegisterComplaint" component={RegisterComplaint} />
                    <Stack.Screen name="Home" component={BottomNav} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator