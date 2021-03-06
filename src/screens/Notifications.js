import { Text, View, FlatList } from 'react-native';
import React, { Component } from 'react';
import WebHandler from '../data/remote/WebHandler'
import Routes from '../data/remote/Routes'
import LoadingPage from '../components/LoadingPage'

const webHandler = new WebHandler()
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
                    {item.notified_at}
                </Text>
            </View>

            <View style={{marginLeft:10,}}>
                <Text style={{fontSize:15,fontFamily:'Ubuntu-Bold',color:'#000'}}>
                Complaint
                </Text>
            </View>

            <View style={{marginLeft:10,marginRight:20,marginTop:5,marginBottom:10}}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{fontSize:12,fontFamily:'Ubuntu-Regular'}}>
                    {item.token}
                </Text>
            </View>
        </View>
    )
}

export default class Notifications extends Component {
    state={
        data:[],
        loading: false
    }
    componentDidMount() { 
        
    this.getNotifications();
     }
     
  getNotifications = () => {
    this.setState({loading: true});
    webHandler.sendGetDataRequest(
      Routes.GET_NOTI,
      resp => {
        console.log(resp.data);
        this.setState({
          data: resp.data,
          loading: false,
        });
      },
      error => {
        console.log(error);
        this.setState({loading: false});
      },
    );
  };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.state.loading && <LoadingPage message={"Loading..."}/>}
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 18,color:'#000' }}>
                        Notifications
                    </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}
