import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { primaryColor, textColor } from '../../assets/styles';
import BackIcon from 'react-native-vector-icons/AntDesign'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Input from '../../components/Input'
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';;
import WebHandler from '../../data/remote/WebHandler';
import Routes from '../../data/remote/Routes';
import PrefHandler from '../../data/local/PrefHandler';
import Helper from '../../utils/Helper'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import LoadingPage from '../../components/LoadingPage';

const Types = ["Clothes", "Medical", "Rashan"]
const Payments = ["Cash",]
const Medical = ["Days", "Monthly",]
const webHandler = new WebHandler()
const prefs = new PrefHandler()
const helper = new Helper()

export default class Donations extends Component {
    state = {
        image: '',
        image1: '',
        type: 'Clothes',
        address: '',
        quantity: '',
        donationAmount: '',
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


    // Donation Api //
    handleDonation() {
        const { type, address, quantity, donationAmount, message,image,image1 } = this.state;
        if (type == '') {
            helper.showToast('Enter your Issue Type', 'red', '#fff')
            return
        }
        if (address == '') {
            helper.showToast('Enter your Address', 'red', '#fff')
            return
        }
        if (message == '') {
            helper.showToast('Enter your Message', 'red', '#fff')
            return
        }
        const params = JSON.stringify({
            "type": type,
            "address": address,
            "quantity": quantity,
            "donation_amount": donationAmount,
            "message": message
        });

        var formdata = new FormData();
        formdata.append('type', type)
        formdata.append('address', address)
        formdata.append('quantity', quantity)
        formdata.append('donation_amount', donationAmount)
        formdata.append('message', message)
        // formdata.append('image', { uri: image1 == '' ? image :image1, name: 'DonationPNG', type: 'image/jpeg' })
        // formdata.append('image', { uri: image1, name: 'DonationPNG', type: 'image/jpeg' })
        this.setState({ loading: true })
        webHandler.sendPostDataRequest(Routes.SAVE_DONATION, formdata, (resp) => {
            console.log('Submit Success', resp)
            helper.showToast('Sucessfully Submitted', 'green', '#fff')
            this.setState({ loading: false })

        }, (errorData) => {
            this.setState({ loading: false })
            console.log(errorData);
        })
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='always' listViewDisplayed={false} contactContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
                {this.state.loading && <LoadingPage message="Loading..." />}
                <View style={{ marginTop: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                        <BackIcon name={'arrowleft'} size={25} color='#000' />
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'Ubuntu-Bold', fontSize: 24, color: textColor }}>
                            Donations
                        </Text>
                    </View>
                </View>

                <View>
                    <SelectDropdown
                        data={Types}
                        defaultButtonText={"Colths"}
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
                            this.setState({
                                type: selectedItem
                            })
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

                {

                    // Clothes Donation View //
                    this.state.type == 'Clothes' ?
                        <View>
                            <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                                <Input
                                    title={'Quantity'}
                                    type={'number-pad'}
                                    inpStyle={{ backgroundColor: '#DCDCDC' }}
                                    onChange={(txt) => this.setState({ quantity: txt })}
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
                                                address: data.description
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
                            </View>

                            

                            <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                                <Text style={{ marginBottom: 5, fontSize: 16, fontFamily: 'Ubuntu-Bold', color: '#000' }}>Additional Information</Text>
                                <Input
                                    onChange={(txt) => this.setState({ message: txt })}
                                    title={'Enter Message'}
                                    inpStyle={{ backgroundColor: '#DCDCDC', height: 100 }}
                                />
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginTop: 20, marginBottom: 10 }}>

                                <View style={{ flex: 1, marginHorizontal: 10 }}>
                                    <Button title={'Submit'} onPress={() => this.handleDonation()} />
                                </View>
                            </View>
                        </View>
                        :

                        // Medical Donation View //
                        this.state.type == 'Medical' ?
                            <View>
                                {/* <View>
                                    <SelectDropdown
                                        data={Medical}
                                        defaultButtonText={"Period"}
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
                                            this.setState({ type: selectedItem })
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
                                        buttonStyle={{ width: '90%', borderRadius: 10, marginTop: 10, height: 55, elevation: 3, alignSelf: 'center', backgroundColor: '#DCDCDC' }}
                                        buttonTextStyle={{ textAlign: 'left', fontSize: 14 }}
                                    />
                                </View> */}

                                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                                    <Input
                                        onChange={(txt) => this.setState({ quantity: txt })}
                                        title={'Amount'}
                                        type={'number-pad'}
                                        inpStyle={{ backgroundColor: '#DCDCDC' }}
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
                                </View>

                               


                                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                                    <Text style={{ marginBottom: 5, fontSize: 16, fontFamily: 'Ubuntu-Bold', color: '#000' }}>Additional Information</Text>
                                    <Input
                                        title={'Enter Message'}
                                        onChange={(txt) => this.setState({ message: txt })}
                                        inpStyle={{ backgroundColor: '#DCDCDC', height: 100 }}
                                    />
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginTop: 20, marginBottom: 10 }}>
                                    <View style={{ flex: 1, marginHorizontal: 10 }} >
                                        <Button title={'Submit'} onPress={() => this.handleDonation()} />
                                    </View>
                                </View>
                            </View>
                            :
                            // Rashan Donation View //
                            <View>
                                {/* <View>
                                    <SelectDropdown
                                        data={Medical}
                                        defaultButtonText={"Period"}
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
                                        buttonStyle={{ width: '90%', borderRadius: 10, marginTop: 10, height: 55, elevation: 3, alignSelf: 'center', backgroundColor: '#DCDCDC' }}
                                        buttonTextStyle={{ textAlign: 'left', fontSize: 14 }}
                                    />
                                </View> */}

                                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                                    <Input
                                        title={'Quantity'}
                                        type={'number-pad'}
                                        onChange={(txt) => this.setState({ quantity: txt })}
                                        inpStyle={{ backgroundColor: '#DCDCDC' }}
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
                                </View>

                                


                                <View style={{ marginTop: 10, marginHorizontal: 18 }}>
                                    <Text style={{ marginBottom: 5, fontSize: 16, fontFamily: 'Ubuntu-Bold', color: '#000' }}>Additional Information</Text>
                                    <Input
                                        title={'Enter Message'}

                                        onChange={(txt) => this.setState({ message: txt })}
                                        inpStyle={{ backgroundColor: '#DCDCDC', height: 100 }}
                                    />
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginTop: 20, marginBottom: 10 }}>

                                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                                        <Button title={'Submit'} onPress={() => this.handleDonation()} />
                                    </View>
                                </View>
                            </View>
                }

            </ScrollView>
        );
    }
}
