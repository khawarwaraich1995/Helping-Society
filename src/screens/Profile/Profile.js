import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Input from '../../components/Input';
import BackIcon from 'react-native-vector-icons/AntDesign'
import { primaryColor, textColor } from '../../assets/styles';
import Button from '../../components/Button';
import Feather from 'react-native-vector-icons/dist/Feather';
import WebHandler from '../../data/remote/WebHandler'
import Routes from '../../data/remote/Routes'
import PrefHandler from '../../data/local/PrefHandler';

const prefs = new PrefHandler()

export default class Profile extends Component {
  state = {
    image: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  }

  componentDidMount() {
    this.userData()
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

  /// User Profile Data ///
  userData = () => {
    prefs.getSession((userInfo) => {
      console.log(userInfo)
      if (userInfo) {
        console.log(userInfo)
        this.setState({
          name: userInfo.userInfo.name,
          email: userInfo.userInfo.email,
          address: userInfo.userInfo.address,
          phone: userInfo.userInfo.phone,
          image: userInfo.userInfo.image,
        })

      }
    })
  }

  /// Profile Update Api ///
  handleUpdate() {
    const { name, phone, address, image, email } = this.state;
    if (image == '') {
      helper.showToast('Please Select your Image', 'red', '#fff')
      return
    }
    if (name == '') {
      helper.showToast('Enter your name', 'red', '#fff')
      return
    }
    if (phone == '') {
      helper.showToast('Enter your phone', 'red', '#fff')
      return
    }
    if (address == '') {
      helper.showToast('Enter your address', 'red', '#fff')
      return
    }

    let webHandler = new WebHandler()

    const bodyParams = new FormData()
    bodyParams.append('image', {
      uri: image,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    bodyParams.append("name", name)
    bodyParams.append("phone", phone)
    bodyParams.append("email", email)
    bodyParams.append("address", address)
    prefs.getSession((token) => {
      webHandler.sendPostDataRequest(Routes.PROFILEUPDATE, bodyParams, (resp) => {
        console.log(resp.user);
        prefs.createSession(resp.user, token.token, (isCreated) => {
          if (isCreated) {
            // this.setState({ loading: false })
            this.userData()
            helper.showToast('Updated Sucessfully', 'green', '#fff')
          } else {
            alert("something went wrong..")
            // this.setState({ loading: false })
          }
        })
      }, (errorData) => {
        if (errorData.message) {
          alert(errorData.message)
        }
      })
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
          {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ right: 20, position: 'absolute' }}>
            <BackIcon name={'edit'} size={25} color='#000' />
          </TouchableOpacity> */}
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

        <View style={{ marginTop: 20 }}>
          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Name'}
              value1={this.state.name}
              inpStyle={{ backgroundColor: '#DCDCDC' }}
              onChange={(txt) => this.setState({ name: txt })}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Email'}
              value1={this.state.email}
              inpStyle={{ backgroundColor: '#DCDCDC' }}
              onChange={(txt) => this.setState({ email: txt })}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Phone Number'}
              value1={this.state.phone}
              inpStyle={{ backgroundColor: '#DCDCDC' }}
              onChange={(txt) => this.setState({ phone: txt })}
            />
          </View>

          <View style={{ marginTop: 10, marginHorizontal: 18 }}>
            <Input
              title={'Address'}
              value1={this.state.address}
              inpStyle={{ backgroundColor: '#DCDCDC' }}
              onChange={(txt) => this.setState({ address: txt })}
            />
          </View>

        </View>
        <View style={{ marginTop: 20, marginHorizontal: 18 }}>
          <Button title='Update' onPress={() => this.handleUpdate()} />
        </View>

      </ScrollView>
    );
  }
}
