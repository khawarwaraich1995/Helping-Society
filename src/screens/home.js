import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'
import BellIcon from 'react-native-vector-icons/EvilIcons';
import { FlatGrid } from 'react-native-super-grid';
import BackIcon from 'react-native-vector-icons/AntDesign'

const DATA = [
    {
        id: 1,
        name: 'Complaints',
        code: '#E4FFFF',
        image: require('../assets/images/clipboard.png'),
        path: 'SaveFood'
    },
    {
        id: 2,
        name: 'Track Complaint Status',
        code: '#D6ADEB',
        image: require('../assets/images/notepad-pen.png'),
        path: 'SaveFood'
    },
    {
        id: 3,
        name: 'Save Food',
        code: '#EBF7CC',
        image: require('../assets/images/fast-food.png'),
        path: 'SaveFood'
    },
    {
        id: 4,
        name: 'Donations',
        code: '#C9C0BB',
        image: require('../assets/images/solidarity.png'),
        path: 'SaveFood'
    },
    {
        id: 5,
        name: 'Live Chat',
        code: '#E9D7D8',
        image: require('../assets/images/live-chat.png'),
        path: 'Profile'
    },

]


class Home extends React.Component {
    renderItem = (item) => {
        return (
            <View>
                <View style={{ marginTop: 0 }}>
                    <TouchableOpacity style={[styles.menuBox, { backgroundColor: item.code }]} onPress={() => this.props.navigation.navigate(item.path)}>
                        <View style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 10, borderRadius: 15 }}>
                            <Image source={item.image} style={{ height: 60, width: 60, alignSelf: 'center', }} />
                        </View>

                        <View>
                            <Text style={{ textAlign: 'center', marginTop: 10, color: '#000', fontSize: 14, fontFamily: 'Ubuntu-Regular' }}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ margin: 20 }}>
                    {/* Top Bar */}
                    <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')} style={{ position: 'absolute', left: 0 }}>
                            <BellIcon name={'bell'} size={45} color='#000' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{ position: 'absolute', right: 0 }}>
                        <Image
                                style={{ height: 30, width: 30, borderRadius: 40 }}
                                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                            />
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 22, color: textColor }}>
                                Welcome, Khawar
                            </Text>
                        </View>
                    </View>
                    

                    <View style={{ marginTop: 30 }}>
                        <FlatGrid
                            data={DATA}
                            spacing={10}
                            style={styles.gridView}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                this.renderItem(item)
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
