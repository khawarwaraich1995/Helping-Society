import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { primaryColor, textColor } from '../../assets/styles';

export default class RegisterComplaint extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                        Report Issue
                    </Text>
                </View>
           
            </View>
        );
    }
}
