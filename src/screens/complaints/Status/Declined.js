import { Text, View, FlatList } from 'react-native';
import React, { Component } from 'react';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        type: 'Complaint',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        type: 'Food',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        type: 'Donation',
    },
];

const renderItem = ({ item }) => {
    return (
        <View style={{ backgroundColor: '#fff', elevation: 5, marginHorizontal: 12, marginVertical: 10,  borderRadius: 8, flexDirection: 'row' }}>
            <View>
                <View style={{ backgroundColor: 'red', width: 10, flex: 1,borderTopLeftRadius:8,borderBottomLeftRadius:8  }}></View>
            </View>
            <View style={{flex:1}}>
                <View style={{alignSelf:'flex-end',marginRight:10}}>
                    <Text style={{fontSize:16,fontFamily:'Ubuntu-Bold',color:'red'}}>Type: {item.type}</Text>
                </View>
                <View style={{marginLeft:10,marginBottom:10}}>
                    <Text style={{fontFamily:'Ubuntu-Regular',fontSize:15,color:'#000'}}>Name: Umair Hassan</Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',fontSize:15,color:'#000',marginTop:10}}>City: Rahimyar Khan</Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',fontSize:15,color:'#000',marginTop:10}}>Date: 28/01/2022</Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',fontSize:15,color:'#000',marginTop:10}}>Time: 12:10:50PM</Text>
                    <Text style={{fontFamily:'Ubuntu-Regular',fontSize:15,color:'#000',marginTop:10}}>Complaint: Pipeline Leakage</Text>
                </View>
            </View>
        </View>
    )
}

export default class Declined extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}
