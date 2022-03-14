import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { primaryColor, textColor } from '../../assets/styles';
import BackIcon from 'react-native-vector-icons/AntDesign'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LocationIcon from 'react-native-vector-icons/EvilIcons'
import Input from '../../components/Input'
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ImagePicker from 'react-native-image-crop-picker';
import WebHandler from '../../data/remote/WebHandler';
import Routes from '../../data/remote/Routes';
import PrefHandler from '../../data/local/PrefHandler';
import Helper from '../../utils/Helper'
import GetLocation from 'react-native-get-location'
import LoadingPage from '../../components/LoadingPage';



const countries = ["Egypt", "Canada", "Australia", "Ireland"]
const webHandler = new WebHandler()
const prefs = new PrefHandler()
const helper = new Helper()


export default class SaveFood extends Component {
    state = {
        image: '',
        image1: '',
        numberofpeople: '',
        address: '',
        lat: '',
        lng: '',
        city: '',
        postalcode: '',
        message: '',
        loading: false
    }

    imagePickCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({ image: image.path })
        }).catch((error) => {
            console.log(error);
        })
    }

    imagePickCamera1 = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({ image1: image.path })
        }).catch((error) => {
            console.log(error);
        })
    }


    // Complaint Api //
    handleComplaint() {
        const { numberofpeople, address, city, postalcode, message,image, image1, lat, lng } = this.state;
        if (numberofpeople == '') {
            helper.showToast('Enter your Number of Peoples', 'red', '#fff')
            return
        }
        if (address == '') {
            helper.showToast('Enter your Address', 'red', '#fff')
            return
        }
        if (city == '') {
            helper.showToast('Enter your City', 'red', '#fff')
            return
        }
        if (postalcode == '') {
            helper.showToast('Enter your Postal Code', 'red', '#fff')
            return
        }
        if (message == '') {
            helper.showToast('Enter your Message', 'red', '#fff')
            return
        }

        
    var formdata = new FormData();
    formdata.append('no_of_peoples', numberofpeople);
    formdata.append('address', address);
    formdata.append('city', city);
    formdata.append('lat', lat);
    formdata.append('lng', lng);
    formdata.append('zip_code', postalcode);
    formdata.append('message', message);
    formdata.append('image', {
      uri: image1 == '' ? image :image1,
      name: 'ComplaintPNG',
      type: 'image/jpeg',
    });


        this.setState({ loading: true })
        webHandler.sendPostDataRequest(Routes.SAVE_FOOD, formdata, (resp) => {
            helper.showToast('Sucessfully Submitted', 'green', '#fff')
            console.log('Submit Success', resp)
            this.setState({ loading: false })

        }, (errorData) => {
            this.setState({ loading: false })
            console.log(errorData);
        })
    }


    location = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log(location);
                this.setState({
                    lat: location.latitude,
                    lng: location.longitude
                })
                helper.showToast('Location Recived SucessFully', 'green', '#fff')
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }


    clear() {
        this.setState({
            numberofpeople:''
        })
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='always'
                listViewDisplayed={false} contactContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
                {this.state.loading && <LoadingPage message="Loading..." />}

                <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                        <BackIcon name={'arrowleft'} size={25} color='#000' />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                            Save Food
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Input
                        title={'Number of peoples'}
                        type={'number-pad'}
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
                        onChange={(txt) => this.setState({ numberofpeople: txt })}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>


                    {this.state.image1 ? null :
                        <TouchableOpacity onPress={() => this.imagePickCamera()}>
                            {this.state.image ?
                                <View>
                                    <Image source={{ uri: this.state.image }} style={{ height: 63, width: 63, borderRadius: 50, }} />
                                </View>
                                :
                                <View>
                                    <View style={{ backgroundColor: '#78F2C3', alignSelf: 'flex-start', padding: 15, borderRadius: 50, alignSelf: 'center' }}>
                                        <Image style={{ height: 30, width: 30 }} source={require('../../assets/images/camera.png')} />
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'center', fontFamily: 'Ubuntu-Regular', color: '#000', marginTop: 5, fontSize: 12 }}>Use{'\n'}Camera</Text>
                                    </View>
                                </View>}
                        </TouchableOpacity>}

                    {this.state.image ? null :
                        <TouchableOpacity onPress={() => this.imagePickCamera1()}>
                            {this.state.image1 ?
                                <View>
                                    <Image source={{ uri: this.state.image1 }} style={{ height: 63, width: 63, borderRadius: 50, }} />
                                </View>
                                :
                                <View>
                                    <View style={{ backgroundColor: '#78F2C3', alignSelf: 'flex-start', padding: 15, borderRadius: 50, alignSelf: 'center' }}>
                                        <Image style={{ height: 30, width: 30 }} source={require('../../assets/images/image-gallery.png')} />
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'center', fontFamily: 'Ubuntu-Regular', color: '#000', marginTop: 5, fontSize: 12 }}>Insert{'\n'}Image</Text>
                                    </View>
                                </View>}
                        </TouchableOpacity>}

                </View>

                <View style={{ marginHorizontal: 18, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <GooglePlacesAutocomplete
                            placeholder='Street Address'
                            fetchDetails={true}
                            enableHighAccuracyLocation={true}
                            getAddressText={(text) => console.log(text)}
                            keyboardShouldPersistTaps='always'
                            listViewDisplayed={false}
                            clearButtonMode={'always'}
                            onPress={(data, details = null) => {
                                let resLength = details.address_components
                                let zipCode = ''
          
                                let filtersResCity = details.address_components.filter(val=>{
                                    if(val.types.includes('locality') || val.types.includes('sublocality')){
                                        return val
                                    }
                                    if(val.types.includes('postal_code')){
                                        let PostalCode = val.long_name
                                        zipCode = PostalCode
                                    }
                                    return false
                                })
          
                                let dataTxtCity = filtersResCity.length > 0 ? filtersResCity[0]: details.address_components[resLength > 1 ? resLength -2 : resLength - 1]
                                let cityData = dataTxtCity.long_name && dataTxtCity.long_name.length > 17 ? dataTxtCity.short_name:dataTxtCity.long_name
          
                                console.log('Zip Code ===>', zipCode)
                                console.log('City Name ===>', cityData)
                                // 'details' is provided when fetchDetails = true
                                this.setState({
                                    lat: details.geometry.location.lat,
                                    lng: details.geometry.location.lng,
                                    address: data.description,
                                    city:cityData,
                                    postalcode:zipCode
                                })
                                console.log(details.geometry.location.lat);
                                console.log(data.description);
                            }}
                            query={{
                                key: 'AIzaSyCw7O8ydcHBvr2psYkmYhavwCkxZ-wUiuY',
                                language: 'en',
                                types: "establishment",
                            }}
                            styles={{
                                textInputContainer: {
                                    backgroundColor: '#DCDCDC',
                                    borderRadius: 5,
                                    padding: 0,
                                },
                                textInput: {
                                    backgroundColor: '#DCDCDC',
                                    borderRadius: 5,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    fontSize: 14,
                                    color: '#000'
                                },
                                container: {
                                    flex: 0,
                                    zIndex: 1,
                                    marginHorizontal: 0,
                                    elevation: 3,
                                    marginTop: 12,
                                    backgroundColor: '#DCDCDC',
                                    borderRadius: 5,
                                },
                                listView: {
                                    backgroundColor: '#DCDCDC',
                                }
                            }}
                        />
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => this.location()} style={{ marginTop: 10, marginLeft: 5, padding: 15, backgroundColor: '#DCDCDC', elevation: 3, borderRadius: 5, }}>
                            <LocationIcon name={'location'} size={30} color='#000' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Input
                        title={'City'}
                        value1={this.state.city}
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
                        onChange={(txt) => this.setState({ city: txt })}
                    />
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Input
                        title={'Postal Code'}
                        value1={this.state.postalcode}
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
                        type={'number-pad'}
                        onChange={(txt) => this.setState({ postalcode: txt })}
                    />
                </View>




                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Text style={{ marginBottom: 5, fontSize: 16, fontFamily: 'Ubuntu-Bold', color: '#000' }}>Additional Information</Text>
                    <Input
                        title={'Enter Message'}
                        inpStyle={{ backgroundColor: '#DCDCDC', height: 100 }}
                        onChange={(txt) => this.setState({ message: txt })}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginTop: 20, marginBottom: 10 }}>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Button title={'Clear'} onPress={()=>this.clear()}/>
                    </View>

                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Button title={'Submit'} onPress={() => this.handleComplaint()} />
                    </View>
                </View>

            </ScrollView>
        );
    }
}
