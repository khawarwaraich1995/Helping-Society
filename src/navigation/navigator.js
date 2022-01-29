import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgotPassword';
import Home from '../screens/home';
import BottonNav from '../navigation/bottomNav'

class Navigator extends React.Component {
    render() {
        const Stack = createNativeStackNavigator();
        return (

                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                        <Stack.Screen name="Home" component={BottonNav} />
                    </Stack.Navigator>
                </NavigationContainer>
        )
    }
}

export default Navigator