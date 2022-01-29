import AsyncStorage from '@react-native-async-storage/async-storage';


const SESSION_INFO_KEY = "@Session:Info"
const SESSION_TOKEN_KEY = "@Session:Token"
const SESSION_CHARGES_KEY = "@Session:Charges"
const SESSION_BOXES_KEY = "@Session:Boxes"
const SESSION_ADDRESS_KEY = "@Session:address"
const SESSION_DISTANCE_KEY = "@Session:distance"
const SESSION_DAYS_KEY = "@Session:days"
const SESSION_PICKUP_ADDRESS_DETAILS_KEY = "@Session:pickaddress"
const SESSION_DROP_ADDRESS_DETAILS_KEY = "@Session:dropaddress"

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

    async StoreCharges(cData, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_CHARGES_KEY, JSON.stringify(cData))
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getChargesSession(onResult) {
        var result = { chargesInfo: null, }
        try {
            const info = await AsyncStorage.getItem(SESSION_CHARGES_KEY)
            if (info) {
                result.chargesInfo = JSON.parse(info)
            }
            onResult(result)
        } catch (error) {
            console.log(error.message)
            onResult(result)
        }
    }

    async StoreBoxes(cData, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_BOXES_KEY, JSON.stringify(cData))
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getBoxesSession(onResult) {
        var result = { boxesInfo: null, }
        try {
            const info = await AsyncStorage.getItem(SESSION_BOXES_KEY)
            if (info) {
                result.boxesInfo = JSON.parse(info)
            }
            onResult(result)
        } catch (error) {
            console.log(error.message)
            onResult(result)
        }
    }

    async StoreAddress(cData, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_ADDRESS_KEY, JSON.stringify(cData))
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getAddressSession(onResult) {
        var result = { addressInfo: null, }
        try {
            const info = await AsyncStorage.getItem(SESSION_ADDRESS_KEY)
            if (info) {
                result.addressInfo = JSON.parse(info)
            }
            onResult(result)
        } catch (error) {
            console.log(error.message)
            onResult(result)
        }
    }


    async StoreDistance(cData, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_DISTANCE_KEY, cData)
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getDistanceSession(onResult) {
        var result = { distance: null, }
        try {
            const info = await AsyncStorage.getItem(SESSION_DISTANCE_KEY)
            if (info) {
                result.distance = JSON.parse(info)
            }
            onResult(result)
        } catch (error) {
            console.log(error.message)
            onResult(result)
        }
    }

    async StoreDays(cData, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_DAYS_KEY, cData)
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getDaysSession(onResult) {
        var result = { days: null, }
        try {
            const info = await AsyncStorage.getItem(SESSION_DAYS_KEY)
            if (info) {
                result.days = JSON.parse(info)
            }
            onResult(result)
        } catch (error) {
            console.log(error.message)
            onResult(result)
        }
    }

    async StorepickupAddressDetails(cData, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_PICKUP_ADDRESS_DETAILS_KEY, JSON.stringify(cData))
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getpickupAddressDetailsSession(onResult) {
        var result = { PickAddressDetails: null, }
        try {
            const info = await AsyncStorage.getItem(SESSION_PICKUP_ADDRESS_DETAILS_KEY)
            if (info) {
                result.PickAddressDetails = JSON.parse(info)
            }
            onResult(result)
        } catch (error) {
            console.log(error.message)
            onResult(result)
        }
    }

    async StoredropAddressDetails(cData, onCompleted) {
        try {
            await AsyncStorage.setItem(SESSION_DROP_ADDRESS_DETAILS_KEY, JSON.stringify(cData))
            onCompleted(true)
        } catch (error) {
            console.log(error.message)
            onCompleted(false)
        }
    }

    async getdropAddressDetailsSession(onResult) {
        var result = { DropAddressDetails: null, }
        try {
            const info = await AsyncStorage.getItem(SESSION_DROP_ADDRESS_DETAILS_KEY)
            if (info) {
                result.DropAddressDetails = JSON.parse(info)
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

    async deleteDataSession(onResult) {
        await AsyncStorage.multiRemove([SESSION_CHARGES_KEY, SESSION_BOXES_KEY, SESSION_ADDRESS_KEY, SESSION_DISTANCE_KEY, SESSION_DAYS_KEY])
        onResult()
    }

}