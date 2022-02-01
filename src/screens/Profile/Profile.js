import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../components/Input';
import BackIcon from 'react-native-vector-icons/AntDesign'
import { primaryColor, textColor } from '../../assets/styles';

export default class Profile extends Component {
  state = {
    image: ''
  }

  imagePick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({ image: image.path })
    }).catch((error) => {
      console.log(error);
    })
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
        <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
            <BackIcon name={'arrowleft'} size={25} color='#000' />
          </TouchableOpacity>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
              Profile
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            alignSelf: 'center',
            borderRadius: 60,
            backgroundColor: 'green',
            marginTop: 30
          }}
          onPress={() => this.imagePick()}>
          {(this.state.image != '') &&
            <Image source={{ uri: this.state.image }} style={{
              height: 120,
              width: 120,
              alignSelf: 'center',
              borderRadius: 60,
              backgroundColor: 'green',
            }} />}
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Name'}
              placeholderTextColor='#000'
              inpStyle={{ backgroundColor: '#DCDCDC' }}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Email'}
              placeholderTextColor='#000'
              inpStyle={{ backgroundColor: '#DCDCDC' }}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Phone Number'}
              placeholderTextColor='#000'
              inpStyle={{ backgroundColor: '#DCDCDC' }}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Address'}
              placeholderTextColor='#000'
              inpStyle={{ backgroundColor: '#DCDCDC' }}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'City'}
              placeholderTextColor='#000'
              inpStyle={{ backgroundColor: '#DCDCDC' }}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Country'}
              placeholderTextColor='#000'
              inpStyle={{ backgroundColor: '#DCDCDC' }}
            />
          </View>
        </View>

      </ScrollView>
    );
  }
}
