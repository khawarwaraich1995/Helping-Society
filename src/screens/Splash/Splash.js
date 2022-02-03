import { Text, View, Image, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import LottieView from 'lottie-react-native'
import PrefHandler from '../../data/local/PrefHandler';
import { StackActions } from '@react-navigation/native'

export default class Splash extends Component {
    componentDidMount() {
        const prefs = new PrefHandler()
        prefs.getSession((result) => {
            setTimeout(() => {
                if (result.token) {
                    this.props.navigation.dispatch(StackActions.replace('Home'))
                } else {
                    this.props.navigation.dispatch(StackActions.replace('Login'))
                }
            }, 2000);
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
                <Image style={{ ...StyleSheet.absoluteFillObject, opacity: .5 }} source={{ uri: 'https://images.unsplash.com/photo-1508766206392-8bd5cf550d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }} />
                <View style={{ alignSelf: 'center' }}>
                    <LottieView source={require('../../assets/animations/19523-tanihub-loading-content.json')} autoPlay loop style={{ height: 150 }} />
                </View>
                <Text style={{ alignSelf: 'center', fontFamily: 'Ubuntu-Bold', fontSize: 22, color: '#fff' }}>Helping Socity</Text>
            </View>
        );
    }
}
