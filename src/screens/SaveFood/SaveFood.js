import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { primaryColor, textColor } from '../../assets/styles';
import BackIcon from 'react-native-vector-icons/AntDesign'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from '../../components/Input'
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import ImagePicker from 'react-native-image-crop-picker';

const countries = ["Egypt", "Canada", "Australia", "Ireland"]

export default class SaveFood extends Component {
    state={
        image:'',
        image1:''
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
    render() {
        return (
            <ScrollView  keyboardShouldPersistTaps='always'
            listViewDisplayed={false} contactContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
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

                {/* <View>
                    <SelectDropdown
                        data={countries}
                        defaultButtonText={"Food Type"}
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
                </View> */}

                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Input
                        title={'Number of peoples'}
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
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

                <View style={{  marginHorizontal: 18 }}>
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

                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Input
                        title={'City'}
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
                    />
                </View>

                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Input
                        title={'Postal Code'}
                        inpStyle={{ backgroundColor: '#DCDCDC' }}
                    />
                </View>




                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                    <Text style={{ marginBottom: 5, fontSize: 16, fontFamily: 'Ubuntu-Bold', color: '#000' }}>Additional Information</Text>
                    <Input
                        title={'Enter Message'}
                        inpStyle={{ backgroundColor: '#DCDCDC', height: 100 }}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginTop: 20, marginBottom: 10 }}>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Button title={'Clear'} />
                    </View>

                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Button title={'Submit'} />
                    </View>
                </View>

            </ScrollView>
        );
    }
}
