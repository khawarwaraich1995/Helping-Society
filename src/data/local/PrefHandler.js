import AsyncStorage from '@react-native-async-storage/async-storage';


const SESSION_INFO_KEY = "@Session:Info"
const SESSION_TOKEN_KEY = "@Session:Token"

export default class PrefHandler {

    async createSession(sData, token, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_INFO_KEY, JSON.stringify(sData))
            await AsyncStorage.setItem(SESSION_TOKEN_KEY, token)
            // console.log('Never Quit ==> ', SESSION_INFO_KEY)
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getSession(onResult) {
        var result = { userInfo: null, token: null }
        try {
            const info = await AsyncStorage.getItem(SESSION_INFO_KEY)
            const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY)

            if (info && token) {
                result.userInfo = JSON.parse(info)
                result.token = token
            }

            onResult(result)
        } catch (error) {
            console.log(error.message)
            onResult(result)
        }
    }

    async deleteSession(onResult) {
        await AsyncStorage.multiRemove([SESSION_INFO_KEY, SESSION_TOKEN_KEY])
        onResult()
    }

}