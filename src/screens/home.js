import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import { primaryColor, bgWhite, textColor, fontFamily } from '../assets/styles'
import BellIcon from 'react-native-vector-icons/EvilIcons';
import { FlatGrid } from 'react-native-super-grid';
import BackIcon from 'react-native-vector-icons/AntDesign'
import PNHelper from '../data/remote/PNHelper';
import WebHandler from '../data/remote/WebHandler';
import Routes from '../data/remote/Routes';
import PrefHandler from '../data/local/PrefHandler';

const webHandler = new WebHandler()
const prefs = new PrefHandler()
const notiHandler = new PNHelper

const DATA = [
    {
        id: 1,
        name: 'Complaint',
        code: '#E4FFFF',
        image: require('../assets/images/clipboard.png'),
        path: 'RegisterComplaint'
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
        path: 'Donations'
    },
    {
        id: 5,
        name: 'Contact Us',
        code: '#E9D7D8',
        image: require('../assets/images/contact.png'),
        path: 'ContactUs'
    },

]


export default class home extends Component {
    state={
        name:'',
        image:''
    }
    componentDidMount() {
        this.sendDevicePNtoServer()
        this.userData()
        this.props.navigation.addListener('focus', () => {
            this.userData()
        });
    }

    sendDevicePNtoServer() {
        notiHandler.init()
        notiHandler.loadDeviceInfo((devInfo) => {
            let body = JSON.stringify({
                "token": devInfo.userId,
            });
            webHandler.sendPostDataRequestNoti(Routes.SAVE_DEVICE_TOKEN, body, (resp) => {
                console.log(resp);
            }, (errorData) => {
            })
        })
    }

    

  /// User Profile Data ///
  userData = () => {
    prefs.getSession((userInfo) => {
      console.log(userInfo)
      if (userInfo) {
        console.log(userInfo)
        this.setState({
          name: userInfo.userInfo.name,
          image: userInfo.userInfo.image,
        })

      }
    })
  }

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
                    <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row',}}>
                       
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={{ position: 'absolute', right: 0 ,elevation:3,backgroundColor:'#fff',borderRadius:40}}>
                            <Image
                                style={{ height: 40, width: 40, borderRadius: 40 }}
                                source={this.state.image == '' ? { uri: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'} : {uri: this.state.image}}
                            />
                        </TouchableOpacity>
                        <View style={{ }}>
                            <Text numberOfLines={1} style={{ fontFamily: 'Ubuntu-Bold', fontSize: 22, color: textColor }}>
                                Welcome, {this.state.name}
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
