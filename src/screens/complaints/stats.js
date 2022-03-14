import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { primaryColor, textColor } from '../../assets/styles';
import Button from '../../components/Button'
import BackIcon from 'react-native-vector-icons/AntDesign'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from '../Profile/Profile';
import Accepted from './Status/Accepted';
import Pending from './Status/Pending';
import Declined from './Status/Declined';

const Tab = createMaterialTopTabNavigator();

export default class Notifications extends Component {
    state = {
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                            History
                        </Text>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <Tab.Navigator>
                        <Tab.Screen name="Complaints" component={Accepted} />
                        <Tab.Screen name="Saved Food" component={Pending} />
                        <Tab.Screen name="Donations" component={Declined} />
                    </Tab.Navigator>
                </View>

            </View>
        );
    }
}
