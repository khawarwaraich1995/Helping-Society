import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import UserIcon from 'react-native-vector-icons/Feather'
import WebHandler from '../data/remote/WebHandler';
import Routes from '../data/remote/Routes';
import PrefHandler from '../data/local/PrefHandler';
import LoadingPage from '../components/LoadingPage';

const prefs = new PrefHandler()

const tabsView = (item) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
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
    state = {
        loading: false
    }

    handleLogout = () => {
        let webHandler = new WebHandler()
        this.setState({ loading: true })
        webHandler.sendPostLogoutRequest(Routes.LOGOUT, (resp) => {
            prefs.deleteSession(() => {
                this.props.navigation.navigate('Login')
                this.setState({ loading: false })
            })
        }, (errorData) => {
            alert(errorData.message)
        })

    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                {this.state.loading && <LoadingPage message="Loging out..." />}
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 18, color: '#000' }}>
                        Settings
                    </Text>
                </View>

                <View style={{ marginTop: 40, marginHorizontal: 12 }}>
                    <TouchableOpacity activeOpacity={.7} onPress={() => this.props.navigation.navigate('Profile')}>
                        {tabsView({ title: 'Profile' })}
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', marginTop: 10 }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.7}>
                        {tabsView({ title: 'About Us' })}
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', marginTop: 10 }}>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.7} onPress={() => this.handleLogout()}>
                        {tabsView({ title: 'Logout' })}
                        <View style={{ borderBottomWidth: 1, borderColor: 'grey', marginTop: 10 }}>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
