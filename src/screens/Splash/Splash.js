import { Text, View, StyleSheet, Image } from 'react-native';
import React, { Component } from 'react';
import LottieView from 'lottie-react-native'

export default class Splash extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }, 1000);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center' }}>
                <Image style={{ ...StyleSheet.absoluteFillObject, opacity: .8 }} source={require('../../assets/images/pngtree-simple-landscape-dusk-app-mobile-terminal-h5-background-photo-634377.jpg')} />
                <View style={{ alignSelf: 'center', }}>
                    <LottieView source={require('../../assets/animations/19523-tanihub-loading-content.json')} autoPlay loop style={{ height: 300, width: '100%' }} />
                </View>
                <Text style={{ textAlign: 'center', fontFamily: 'Ubuntu-Bold', fontSize: 30, color: '#fff' }}>Helping Socity</Text>
            </View>
        );
    }
}
