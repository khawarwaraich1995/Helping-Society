import { Text, View, TouchableOpacity,Linking } from 'react-native';
import React, { Component } from 'react';
import BackIcon from 'react-native-vector-icons/AntDesign'
import { primaryColor, textColor } from '../../assets/styles';
import call from 'react-native-phone-call'
import Share from 'react-native-share';

const args = {
    number: '+923485126286', // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
}

const shareOptions = {
    title: 'Share via',
    message: 'some message',
    to: 'asdasdas',
    social: Share.Social.EMAIL,
};

export default class ContactUs extends Component {
    dial = () => {
        call(args).catch(console.error)
    }

    email = () => {
        
        Linking.openURL('mailto:Support@gmail.com')
    }
    render() {
        return (
            <View>
                <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                        <BackIcon name={'arrowleft'} size={25} color='#000' />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                            Contact Us
                        </Text>
                    </View>
                </View>
                <View style={{ marginLeft: 20, marginTop: 30 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontFamily: 'Ubuntu-Bold', color: '#000' }}>
                            HelpLine Number
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'Ubuntu-SemiBold', fontSize: 16, color: '#000' }}>+923485126286</Text>
                        <TouchableOpacity onPress={() => { this.dial() }} style={{ marginRight: 20, borderWidth: 1, alignSelf: 'flex-start', padding: 7, paddingLeft: 20, paddingRight: 20, borderRadius: 10 }}>
                            <Text style={{ fontFamily: 'Ubuntu-Regular', color: '#000' }}>Dial</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginLeft: 20, marginTop: 30 }}>
                    <View>
                        <Text style={{ fontSize: 20, fontFamily: 'Ubuntu-Bold', color: '#000' }}>
                            HelpLine Mail
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontFamily: 'Ubuntu-SemiBold', fontSize: 16, color: '#000' }}>Support@gmail.com</Text>
                        <TouchableOpacity onPress={() => this.email()} style={{ marginRight: 20, borderWidth: 1, alignSelf: 'flex-start', padding: 7, paddingLeft: 20, paddingRight: 20, borderRadius: 10 }}>
                            <Text style={{ fontFamily: 'Ubuntu-Regular', color: '#000' }}>Mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ textAlign: 'center', marginTop: 20, fontFamily: 'Ubuntu-Regular' }}>Helping Socity will try to provide you best service. For complaint or suggestion you can Call us or Mail us on given. Thanks </Text>
            </View>
        );
    }
}
