import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'
import { Checkbox } from 'react-native-paper';
import LottieView from 'lottie-react-native'
import Input from '../components/Input'
import Button from '../components/Button'
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';


class ForgotPassword extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: primaryColor }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{
                        height: 700,
                        backgroundColor: bgWhite,
                        borderBottomRightRadius: 70,
                        borderBottomLeftRadius: 70
                    }}>

                        <View style={{ alignSelf: 'center', marginTop: 50 }}>
                            <LottieView source={require('../assets/animations/login/forgot-password.json')} autoPlay loop style={{ height: 150 }} />
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 40 }}>
                            <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 30 }}> Forgot Password</Text>
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 10 }}>
                            <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 15, textAlign: 'center' }}> Reset password in two {'\n'}   quick steps</Text>
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 35 }}>
                            <Input icon={<EmailIcon name="email" size={20} color={textColor} />} title="Username/Email" type="email-address" onChange={(txt) => this.setState({ userName: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 15, marginTop: 40 }}>
                            <Button title="Reset" inputStyle={{ marginHorizontal: 100 }}></Button>
                        </View>



                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={{ color: '#605f5f', fontFamily: fontFamily, fontSize: 17, textAlign: 'center' }}> Don't have an account? </Text>
                            <TouchableOpacity>
                                <Text style={{ color: 'black', fontFamily: fontFamily, fontSize: 19 }} onPress={() => this.props.navigation.navigate('Register')}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

export default ForgotPassword
