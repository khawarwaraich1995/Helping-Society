import React from "react"
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'

const Button = ({ inputStyle, onPress, icon, title }) => {

    return (
        <View>
            <TouchableOpacity
                style={{ backgroundColor: primaryColor, padding: 10, borderRadius: 10, elevation: 3, ...inputStyle }}
                onPress={onPress}
            >
                <Text style={{ textAlign: 'center', color: '#000', fontSize: 18, fontFamily: fontFamily }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )

}

export default Button