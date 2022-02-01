import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../components/Input';
import BackIcon from 'react-native-vector-icons/AntDesign'
import { primaryColor, textColor } from '../../assets/styles';
import Button from '../../components/Button';
import Feather from 'react-native-vector-icons/dist/Feather';
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
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ right: 20, position: 'absolute' }}>
            <BackIcon name={'edit'} size={25} color='#000' />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20, }}>
          <View style={{ backgroundColor: "white", elevation: 5, borderRadius: 65, }}>
            <Image source={{ uri: this.state.image }} style={{ height: 130, width: 130, borderRadius: 65, padding: 10, }} />
            <View style={{ position: "absolute", right: -2, top: 80, height: 40, width: 40, backgroundColor: "red", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
              <TouchableOpacity onPress={() => { this.imagePick() }}>
                <Feather name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

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
        <View style={{ marginTop: 20, marginHorizontal: 18 }}>
          <Button title='Update' />
        </View>

      </ScrollView>
    );
  }
}
