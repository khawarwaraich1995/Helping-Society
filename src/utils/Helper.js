import { CommonActions } from '@react-navigation/native';
import { Alert, Linking } from 'react-native';
import Snackbar from 'react-native-snackbar';

export default class Helper {

    isEmptyString(str) {
        return (str == "" || !str)
    }

    isEmptyArray(arr) {
        return (!arr || arr.length == 0)

    }

    isValidEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    isValidPassword(password){
        let re = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$_&-+-()/="':;?,.<>%^&*])[a-zA-Z0-9!@#$_&-+-()/="':;?,.<>%^&*]{8,100}$/;
        return password.match(re);
      };
      

    showToast(message, background, color) {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: background ? background : "#000",
            textColor: color ? color : 'white',
            action: {
                text: 'Ok',
                textColor: 'white',
            },
        });
    }

    resetAndGo(navigation, routeName) {
        if (navigation && !this.isEmptyString(routeName)) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: routeName },
                    ],
                })
            );
        }
    }

    hexToRgbA(hex, alpha) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
        }
        return ""
    }

    showAlert(title, msg, color) {
        Alert.alert(title, msg, [
            { text: "Okay", style: "cancel" }
        ])
    }

    openWebLink(urlLink) {
        Linking.canOpenURL(urlLink).then(supported => {
            if (supported) {
                Linking.openURL(urlLink);
            } else {
                console.log("Don't know how to open URI: " + urlLink);
            }
        });
    }


    getDaysInfo() {
        return {
            "SUN": { index: 0, name: "Sunday" },
            "MON": { index: 1, name: "Monday" },
            "TUE": { index: 2, name: "Tuesday" },
            "WED": { index: 3, name: "Wednesday" },
            "THU": { index: 4, name: "Thursday" },
            "FRI": { index: 5, name: "Friday" },
            "SAT": { index: 6, name: "Saturday" }
        }
    }

    getWithZero(num) {
        return ('0' + num).slice(-2)
    }
}