import { Text, View, FlatList } from 'react-native';
import React, { Component } from 'react';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Complaint',
        messgae:'Application has been submitted sucessdull for more information contact help center.',
        time: '2:00 PM'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Complaint',
        messgae:'Application has been submitted sucessdull for more information contact help center.',
        time: '3:00 PM'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Complaint',
        messgae:'Application has been submitted sucessdull for more information contact help center.',
        time: '4:00 PM'
    },
];

const renderItem = ({ item }) => {
    return (
        <View style={{ backgroundColor: '#fff', elevation: 3, marginTop: 5, marginHorizontal: 12, marginBottom: 5,borderRadius:10 }}>
            <View style={{ alignSelf: 'flex-end', marginRight: 15, marginTop: 5 ,color:'#000'}}>
                <Text style={{ fontSize: 10, fontFamily: 'Ubuntu-Regular',color:'#000' }}>
                    {item.time}
                </Text>
            </View>

            <View style={{marginLeft:10,}}>
                <Text style={{fontSize:15,fontFamily:'Ubuntu-Bold',color:'#000'}}>
                    {item.title}
                </Text>
            </View>

            <View style={{marginLeft:10,marginRight:20,marginTop:5,marginBottom:10}}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize:12,fontFamily:'Ubuntu-Regular'}}>
                    {item.messgae}
                </Text>
            </View>
        </View>
    )
}

export default class Notifications extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 18,color:'#000' }}>
                        Notifications
                    </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}
