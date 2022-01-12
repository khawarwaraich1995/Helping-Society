import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'
import { Checkbox } from 'react-native-paper';
import LottieView from 'lottie-react-native'
import Input from '../components/Input'
import Button from '../components/Button'
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';


class Register extends React.Component {
    state = {
        checked: false
    }
    render() {
        const { checked } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: primaryColor }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{
                        height: 700,
                        backgroundColor: bgWhite,
                        borderBottomRightRadius: 70,
                        borderBottomLeftRadius: 70
                    }}>

                        <View style={{ alignSelf: 'center', marginTop: 15 }}>
                            <LottieView source={require('../assets/animations/login/82974-add-user.json')} autoPlay loop style={{ height: 150 }} />
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 30 }}> Register</Text>
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 10 }}>
                            <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 15, textAlign: 'center' }}> Create an account with your {'\n'} details to continue</Text>
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                            <Input icon={<EmailIcon name="email" size={20} color={textColor} />} title="Full name" type="default" onChange={(txt) => this.setState({ userName: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                            <Input icon={<EmailIcon name="email" size={20} color={textColor} />} title="Choose unique username" type="default" onChange={(txt) => this.setState({ userName: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                            <Input icon={<EmailIcon name="email" size={20} color={textColor} />} title="Email address" type="email-address" onChange={(txt) => this.setState({ userName: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                            <Input icon={<PasswordIcon name="form-textbox-password" size={20} color={textColor} />} title="Password" type="default" onChange={(txt) => this.setState({ Password: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        this.setState({ checked: !checked });
                                    }}
                                />
                                <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 15, textAlign: 'center' }}> I agree with Terms and Conditions.</Text>
                            </View>

                        </View>

                        <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                            <Button title="Register" onPress={() => this.props.navigation.navigate('Login')} inputStyle={{marginHorizontal: 100}}></Button>
                        </View>



                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={{ color: '#605f5f', fontFamily: fontFamily, fontSize: 17, textAlign: 'center' }}> Already have an account? </Text>
                            <TouchableOpacity>
                                <Text style={{ color: 'black', fontFamily: fontFamily, fontSize: 19 }} 
                                onPress={() => this.props.navigation.navigate('Login')}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

export default Register
