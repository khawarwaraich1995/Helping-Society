import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Register from '../screens/register';
import ForgotPassword from '../screens/forgotPassword';
import Home from '../screens/home';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

class Navigator extends React.Component {
    render() {
        const Stack = createNativeStackNavigator();
        const _renderIcon = (routeName, selectedTab) => {
            let icon = '';

            switch (routeName) {
                case 'title1':
                    icon = 'ios-home-outline';
                    break;
                case 'title2':
                    icon = 'settings-outline';
                    break;
            }

            return (
                <Ionicons
                    name={icon}
                    size={25}
                    color={routeName === selectedTab ? 'black' : 'gray'}
                />
            );
        };

        const renderTabBar = (routeName, selectedTab, navigate) => {
            return (
                <TouchableOpacity
                    onPress={() => navigate(routeName)}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {_renderIcon(routeName, selectedTab)}
                </TouchableOpacity>
            );
        };
        return (

            <>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                </NavigationContainer>


                <View style={{ flex: 1 }}>
                    <CurvedBottomBar.Navigator
                        style={styles.bottomBar}
                        strokeWidth={0.5}
                        height={55}
                        circleWidth={55}
                        bgColor="white"
                        initialRouteName="title1"
                        borderTopLeftRight
                        swipeEnabled
                        renderCircle={({ selectedTab, navigate }) => (
                            <Animated.View style={styles.btnCircle}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => Alert.alert('Click Action')}>
                                    <Ionicons name={'apps-sharp'} color="gray" size={25} />
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                        tabBar={renderTabBar}>
                        <CurvedBottomBar.Screen
                            name="title1"
                            position="left"
                            component={({ navigate }) => (
                                <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />
                            )}
                        />
                        <CurvedBottomBar.Screen
                            name="title2"
                            component={({ navigate }) => (
                                <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />
                            )}
                            position="right"
                        />
                    </CurvedBottomBar.Navigator>
                </View>
            </>

        )
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        marginVertical: 5,
    },
    bottomBar: {},
    btnCircle: {
        width: 60,
        height: 60,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
        bottom: 30,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    img: {
        width: 30,
        height: 30,
    },
});

export default Navigator