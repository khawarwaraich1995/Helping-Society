import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import {primaryColor} from '../assets/styles'
import Home from '../screens/home';
import Settings from '../screens/Settings';
import Notifications from '../screens/Notifications';

const TabArr = [
    { route: 'Notification', label: 'Notification', type: Icons, icon: 'notifications-outline', component: Notifications },
    { route: 'Home', label: 'Home', type: Icons, icon: 'home-outline', component: Home },
    { route: 'Settings', label: 'Settings', type: Icons, icon: 'cog-outline', component: Settings },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={300}
                style={styles.container}>
                <View style={styles.btn}>
                    <Animatable.View
                        ref={circleRef}
                        style={styles.circle} />
                    <Icon size={20} type={item.type} name={item.icon} color={focused ? '#fff' : '#000'} />
                </View>
                <Animatable.Text
                    ref={textRef}
                    style={styles.text}>
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    )
}

export default function AnimTab1() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
            }}
            defaultScreenOptions={'Home'}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        height: 70,
        position: 'absolute',
        bottom: 16,
        right: 16,
        left: 16,
        borderRadius: 16,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#fff',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
        borderRadius: 25,
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: '#000',
    }
})