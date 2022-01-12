import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'
import BellIcon from 'react-native-vector-icons/EvilIcons';

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ margin: 20 }}>
                    {/* Top Bar */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <TouchableOpacity style={{ flexGrow: 1, alignSelf: 'flex-start' }}>
                            <BellIcon name="bell" size={45} color={'black'} />
                        </TouchableOpacity>


                        <TouchableOpacity>
                            <Image
                                style={{ height: 30, width: 30, borderRadius: 40 }}
                                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'space-between', flexWrap: 'wrap' }}>

                        <TouchableOpacity style={[styles.menuBox, { backgroundColor: '#FFEDED' }]}>
                        </TouchableOpacity>
               

                    </View>

                </View>
            </View>
        )
    }
}

export default Home


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgWhite,

    },
    menuBox: {
        width: 170,
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: 'space-between'
    }
});
