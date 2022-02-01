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
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterComplaint')} style={{ position: 'absolute', right: 20 }}>
                        <BackIcon name={'pluscircleo'} size={25} color='#000' />
                    </TouchableOpacity> */}
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                            History
                        </Text>
                    </View>
                </View>

                <View style={{flex:1}}>
                    <Tab.Navigator>
                        <Tab.Screen name="Accepted" component={Accepted} />
                        <Tab.Screen name="Pending" component={Pending} />
                        <Tab.Screen name="Declined" component={Declined} />
                    </Tab.Navigator>
                </View>

                {/* <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                        Complaints
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity style={{ flexGrow: 1, alignSelf: 'flex-end' }}>
                        <Button title="New Complaint" onPress={() => this.props.navigation.navigate('RegisterComplaint')} inputStyle={{ marginHorizontal: 10}}></Button>
                    </TouchableOpacity>

                </View> */}
                {/* 
                <View style={{ margin: 20, backgroundColor: primaryColor, height: 80, borderRadius: 20}}>

                </View> */}
            </View>
        );
    }
}
