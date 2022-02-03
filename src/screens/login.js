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
import LoadingPage from '../components/LoadingPage';

const webHandler = new WebHandler()
const prefs = new PrefHandler()
const helper = new Helper()

class Login extends React.Component {
    state = {
        checked: false,
        email: '',
        password: '',
        loading: false
    }

    // Login Api //
    handleLogin() {
        const { email, password } = this.state;
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
        if (password.length < 6) {
            helper.showToast('Password must be greater than 8', 'red', '#fff')
            return
        }

        let webHandler = new WebHandler()

        const bodyParams = new FormData()
        bodyParams.append("email", email)
        bodyParams.append("password", password)
        this.setState({ loading: true })
        webHandler.sendPostDataRequest(Routes.LOGIN, bodyParams, (resp) => {
            console.log('Login Success', resp)
            const prefs = new PrefHandler()
            prefs.createSession(resp.data, resp.access_token, (isCreated) => {
                if (isCreated) {
                    this.props.navigation.dispatch(StackActions.replace('HomeScreen'))
                    this.setState({ loading: false })
                } else {
                    alert("something went wrong..")
                    this.setState({ loading: false })
                }
            })
        }, (errorData) => {
            this.setState({ loading: false })
            if (errorData.errors) {
                alert(errorData.errors.email + '\n' + errorData.errors.password)
                return
            }
            if (errorData.message) {
                helper.showToast('You Have Enter Wronge Email/Password', 'red', '#fff')
            }
        })
    }

    render() {
        const { checked } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: primaryColor }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {this.state.loading && <LoadingPage message="Logging in..." />}
                    <View style={{
                        height: 700,
                        backgroundColor: bgWhite,
                        borderBottomRightRadius: 70,
                        borderBottomLeftRadius: 70
                    }}>

                        <View style={{ alignSelf: 'center', marginTop: 50 }}>
                            <LottieView source={require('../assets/animations/76009-fingerprint-icon-animation.json')} autoPlay loop style={{ height: 150 }} />
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 40 }}>
                            <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 30 }}> Login</Text>
                        </View>

                        <View style={{ alignSelf: 'center', marginTop: 10 }}>
                            <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 15, textAlign: 'center' }}> Use your credentials to login {'\n'}your account</Text>
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 35 }}>
                            <Input icon={<EmailIcon name="email" size={20} color={textColor} />} title="Username/Email" type="email-address" onChange={(txt) => this.setState({ email: txt })} />
                        </View>

                        <View style={{ marginHorizontal: 25, marginTop: 35 }}>
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
                                <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 15, textAlign: 'center' }}> Remember me</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                <Text style={{ color: textColor, fontFamily: fontFamily, fontSize: 14 }}> Forgot Password?</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ marginHorizontal: 15, marginTop: 40 }}>
                            <Button title="Login" onPress={() => { this.handleLogin() }} inputStyle={{ marginHorizontal: 100 }}></Button>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={{ color: '#605f5f', fontFamily: fontFamily, fontSize: 17, textAlign: 'center' }}> Don't have an account? </Text>
                            <TouchableOpacity >
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

export default Login
