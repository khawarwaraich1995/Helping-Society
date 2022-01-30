import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'
import BellIcon from 'react-native-vector-icons/EvilIcons';
import { FlatGrid } from 'react-native-super-grid';

const DATA = [
    {
        id: 1,
        name: 'Email & Social Tickiting',
        code: '#E4FFFF',
        image: require('../assets/images/email.png')
    },
    {
        id: 2,
        name: 'Push Notification',
        code: '#EBF7CC',
        image: require('../assets/images/notification.png')
    },
    {
        id: 3,
        name: 'Track Complaint Status',
        code: '#D6ADEB',
        image: require('../assets/images/notepad-pen.png')
    },
    {
        id: 4,
        name: 'Live Chat',
        code: '#E9D7D8',
        image: require('../assets/images/live-chat.png')
    },
    {
        id: 5,
        name: 'Dynamic Ticket Form',
        code: '#C9C0BB',
        image: require('../assets/images/clipboard.png')
    },
    {
        id: 6,
        name: 'Self Service Portal',
        code: '#EBF4FA',
        image: require('../assets/images/self-service.png')
    },
]

const renderItem = (item) => {
    return (
        <View>
            <View style={{ marginTop: 0 }}>
                <TouchableOpacity style={[styles.menuBox, { backgroundColor: item.code }]}>
                    <View style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 10, borderRadius: 15 }}>
                        <Image source={item.image} style={{ height: 60, width: 60, alignSelf: 'center', }} />
                    </View>

                    <View>
                        <Text style={{textAlign:'center',marginTop:10,color:'#fff',fontSize:14,fontFamily:'Ubuntu-Regular'}}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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

                    <View style={{marginTop:30}}>
                        <FlatGrid
                            data={DATA}
                            spacing={10}
                            style={styles.gridView}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                renderItem(item)
                            )}
                            keyExtractor={item => item.id}
                        />
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
        justifyContent: 'center',
        borderRadius: 15,
        padding: 10,
        height: 150,
    },
    gridView: {
        marginTop: 10,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
