import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { primaryColor, textColor } from '../../assets/styles';
import BackIcon from 'react-native-vector-icons/AntDesign'
import LocationIcon from 'react-native-vector-icons/EvilIcons'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from '../../components/Input'
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import WebHandler from '../../data/remote/WebHandler';
import Routes from '../../data/remote/Routes';
import PrefHandler from '../../data/local/PrefHandler';
import Helper from '../../utils/Helper'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import GetLocation from 'react-native-get-location'
import LoadingPage from '../../components/LoadingPage';

const countries = ["Agriculture", "Citizen Rights", "Developement Projects", "Disasters", "Education", "Energy and Power", "Enviornment and Forest", "Health", "FBR"]
const webHandler = new WebHandler()
const prefs = new PrefHandler()
const helper = new Helper()


export default class RegisterComplaint extends Component {
    state = {
        image: '',
        image1: '',
        issueType: '',
        address: '',
        city: '',
        lat: '',
        lng: '',
        postalCode: '',
        message: '',
        loading: false
    }

    componentDidMount() {

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
        const { issueType, address, city, postalCode, message, image1, lat, lng } = this.state;
        if (issueType == '') {
            helper.showToast('Enter your Issue Type', 'red', '#fff')
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
        if (postalCode == '') {
            helper.showToast('Enter your Postal Code', 'red', '#fff')
            return
        }
        if (message == '') {
            helper.showToast('Enter your Message', 'red', '#fff')
            return
        }

        const params = JSON.stringify({
            "issue_type": issueType,
            "address": address,
            "city": city,
            "lat": lat,
            "lng": lng,
            "zip_code": postalCode,
            "message": message
        });
        this.setState({ loading: true })
        webHandler.sendPostDataRequest(Routes.COMPLAINT_SUBMIT, params, (resp) => {
            console.log('Submit Success', resp)
            helper.showToast('Complaint Sucessfully Submitted', 'green', '#fff')
            this.setState({ loading: false })

        }, (errorData) => {
            this.setState({ loading: false })
            console.log(errorData);
        })
    }

    render() {
        return (
            <ScrollView
                keyboardShouldPersistTaps='always'
                listViewDisplayed={false} contactContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
                {this.state.loading && <LoadingPage message="Loading..." />}

                <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                        <BackIcon name={'arrowleft'} size={25} color='#000' />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                            Report Issue
                        </Text>
                    </View>
                </View>

                <View>
                    <SelectDropdown
                        data={countries}
                        defaultButtonText={"Issue Type"}
                        renderDropdownIcon={(isOpened) => {
                            return (
                                <FontAwesome
                                    name={isOpened ? "chevron-up" : "chevron-down"}
                                    color={"#444"}
                                    size={14}
                                />
                            );
                        }}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            this.setState({ issueType: selectedItem })
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        buttonStyle={{ width: '90%', borderRadius: 10, marginTop: 30, height: 55, elevation: 3, alignSelf: 'center', backgroundColor: '#DCDCDC' }}
                        buttonTextStyle={{ textAlign: 'left', fontSize: 14 }}
                    />
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
                                // 'details' is provided when fetchDetails = true
                                this.setState({
                                    lat: details.geometry.location.lat,
                                    lng: details.geometry.location.lng,
                                    address: data.description
                                })
                                console.log(details.geometry.location.lat);
                                console.log(data.description);
                            }}
                            query={{
                                key: 'AIzaSyCw7O8ydcHBvr2psYkmYhavwCkxZ-wUiuY',
                                language: 'en',
                                components: "country:pak",
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
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
                        onChange={(txt) => this.setState({ city: txt })}
                    />
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Input
                        title={'Postal Code'}
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
                        type={'number-pad'}
                        onChange={(txt) => this.setState({ postalCode: txt })}
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
                        <Button title={'Clear'} />
                    </View>

                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Button title={'Submit'} onPress={() => this.handleComplaint()} />
                    </View>
                </View>

            </ScrollView >
        );
    }
}
