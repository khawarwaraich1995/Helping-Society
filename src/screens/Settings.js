import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import UserIcon from 'react-native-vector-icons/Feather'

const tabsView = (item) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:20 }}>
            <View>
                <UserIcon name='user' size={20} color='#000' />
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Ubuntu-Bold', color: '#000' }}>{item.title}</Text>
            </View>
            <View>
                <UserIcon name='chevron-right' size={20} color='#000' />
            </View>
        </View>
    )
}

export default class Settings extends Component {
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 18, color: '#000' }}>
                        Settings
                    </Text>
                </View>

                <View style={{ marginTop: 40, marginHorizontal: 12 }}>
                    <TouchableOpacity activeOpacity={.7}>
                        {tabsView({ title: 'Profile' })}
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', marginTop: 10 }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.7}>
                        {tabsView({ title: 'About Us' })}
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', marginTop: 10 }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.7}>
                        {tabsView({ title: 'Privacy & Security' })}
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', marginTop: 10 }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.7}>
                        {tabsView({ title: 'Logout' })}
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', marginTop: 10 }}>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
