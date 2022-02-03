import React, { useState, useEffect } from "react"
import { View, Text, TextInput } from 'react-native'

const Input = ({ inpStyle, iconStyle, onChange, icon, title, type, placeholderTextColor, multiline, value1 }) => {

    const [value, setValue] = useState("")

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 3, borderRadius: 7, elevation: 3, ...inpStyle }}>

            <View style={{ ...iconStyle, marginLeft: 10 }}>
                {icon}
            </View>

            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ padding: 10 }}
                    value={value1}
                    multiline={multiline}
                    placeholderTextColor={placeholderTextColor}
                    keyboardType={type}
                    placeholder={title}
                    onChangeText={(txt) => handleTextOnChange(txt)}
                />
            </View>

        </View>
    )

    function handleTextOnChange(txt) {
        setValue(txt)
        onChange && onChange(txt)
    }

}

export default Input