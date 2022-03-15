import {Text, View, FlatList} from 'react-native';
import React, {Component} from 'react';
import WebHandler from '../../../data/remote/WebHandler';
import Routes from '../../../data/remote/Routes';
import LoadingPage from '../../../components/LoadingPage'

const webHandler = new WebHandler();

const renderItem = ({item}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        elevation: 5,
        marginHorizontal: 12,
        marginVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
      }}>
      <View>
        <View
          style={{
            backgroundColor: item.status == 'Completed'? "green" : item.status == 'Cancelled' ? "red":"orange",
            width: 10,
            flex: 1,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}></View>
      </View>
      <View style={{flex: 1}}>
        <View style={{alignSelf: 'flex-end', marginRight: 10}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Ubuntu-Bold', color: 'green'}}>
            Type: Saved Food
          </Text>
        </View>
        <View style={{marginLeft: 10, marginBottom: 10}}>
          <Text
            style={{fontFamily: 'Ubuntu-Regular', fontSize: 15, color: '#000'}}>
            No of Peoples: {item.no_of_peoples}
          </Text>
          <Text
            style={{
              fontFamily: 'Ubuntu-Regular',
              fontSize: 15,
              color: '#000',
              marginTop: 10,
            }}>
            City: {item.city}
          </Text>
          <Text
            style={{
              fontFamily: 'Ubuntu-Regular',
              fontSize: 15,
              color: '#000',
              marginTop: 10,
            }}>
            Date: {item.created_at}
          </Text>
          {/* <Text
            style={{
              fontFamily: 'Ubuntu-Regular',
              fontSize: 15,
              color: '#000',
              marginTop: 10,
            }}>
            Time: 12:10:50PM
          </Text> */}
          <Text
          numberOfLines={1}
            style={{
              fontFamily: 'Ubuntu-Regular',
              fontSize: 15,
              color: '#000',
              marginTop: 10,
            }}>
            Address: {item.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default class Accepted extends Component {
  state = {save_food: [],loading:false};
  componentDidMount() {
    this.getAccepted();
  }

  getAccepted = () => {
    this.setState({loading: true});
    webHandler.sendGetDataRequest(
      Routes.GET_COMPLAINS,
      resp => {
        console.log(resp.complaints);
        this.setState({
            save_food: resp.save_food,
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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      {this.state.loading && <LoadingPage message='Loading...'/>}
        <FlatList
          data={this.state.save_food}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
