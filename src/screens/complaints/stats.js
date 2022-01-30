import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { primaryColor, textColor } from '../../assets/styles';
import Button from '../../components/Button'

export default class Notifications extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                        Complaints
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity style={{ flexGrow: 1, alignSelf: 'flex-end' }}>
                        <Button title="New Complaint" onPress={() => this.props.navigation.navigate('RegisterComplaint')} inputStyle={{ marginHorizontal: 10}}></Button>
                    </TouchableOpacity>

                </View>
                {/* 
                <View style={{ margin: 20, backgroundColor: primaryColor, height: 80, borderRadius: 20}}>

                </View> */}
            </View>
        );
    }
}
