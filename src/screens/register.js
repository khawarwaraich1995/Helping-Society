import React from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'
import { Checkbox } from 'react-native-paper';
import LottieView from 'lottie-react-native'
import Input from '../components/Input'
import Button from '../components/Button'
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PasswordIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Routes from '../data/remote/Routes';
import WebHandler from '../data/remote/WebHandler';
import PrefHandler from '../data/local/PrefHandler';
import Helper from '../utils/Helper';
import { StackActions } from '@react-navigation/native'
import LoadingPage from '../components/LoadingPage';

const webHandler = new WebHandler()
const prefs = new PrefHandler()
const helper = new Helper()


class Register extends React.Component {

    state = {
        checked: false,
        name: '',
        email: '',
        password: '',
        loading: false
    }

    // Signup Api //
    handleSignup = () => {
        const { name, email, password, checked } = this.state;
        if (name == '') {
            helper.showToast('You must enter your FullName', 'red', '#fff')
            return
        }
        if (email == '') {
            helper.showToast('Enter your Email', 'red', '#fff')
            return
        }
        if (!helper.isValidEmail(email)) {
            helper.showToast('Your Email is not Correct', 'red', '#fff')
            return
        }
        if (password == '') {
            helper.showToast('Password Required', 'red', '#fff')
            return
        }
        if (password.length < 8) {
            helper.showToast('Password must be greater than 8', 'red', '#fff')
            return
        }
        if (checked == false) {
            helper.showToast('Please accept terms and conditions', 'red', '#fff')
            return
        }

        let webHandler = new WebHandler()

        var formdata = new FormData();
        formdata.append('name', name)
        formdata.append('email', email)
        formdata.append('password', password)
        this.setState({ loading: true })
        webHandler.sendPostDataRequest(Routes.SIGNUP, formdata, (resp) => {
            console.log('SignUp Success', resp)
            const prefs = new PrefHandler()
            prefs.createSession(resp.data, resp.access_token, (isCreated) => {
                if (isCreated) {
                    this.props.navigation.dispatch(StackActions.replace('Home'))
                    this.setState({ loading: false })
                } else {
                    alert("something went wrong..")
                    this.setState({ loading: false })
                }
            })
        }, (errorData) => {
            this.setState({ loading: false })
            if (errorData.errors.email) {
                helper.showToast('Email already exits', 'red', '#fff')
            }
            if (errorData.message) {
                helper.showToast('Something went wronge', 'red', '#fff')
            }
        })

    }


    render() {
        const { checked } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: primaryColor }}>
                {this.state.loading && <LoadingPage message="Signing up..." />}
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
                            <Input icon={<EmailIcon name="email" size={20} color={textColor} />} title="Full Name" type="default" onChange={(txt) => this.setState({ name: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                            <Input icon={<EmailIcon name="email" size={20} color={textColor} />} title="Email Address" type="email-address" onChange={(txt) => this.setState({ email: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 20 }}>
                            <Input icon={<PasswordIcon name="form-textbox-password" size={20} color={textColor} />} title="Password" type="default" onChange={(txt) => this.setState({ password: txt })} />
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
                            <Button title="Register" onPress={() => this.handleSignup()} inputStyle={{ marginHorizontal: 100 }}></Button>
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
