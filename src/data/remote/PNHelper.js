import { Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';

var notificationIDListener
export default class PNHelper {

    async init() {
        let deviceInfo = await OneSignal.getDeviceState()
        if (!deviceInfo.hasNotificationPermission && Platform.OS === "ios") {
            OneSignal.promptForPushNotificationsWithUserResponse((response) => {

            })
        }
        OneSignal.addSubscriptionObserver(event => {
            console.log("OneSignal: subscription changed:", event);
            if (event.to.isSubscribed) {
                let data = { userId: event.to.userId, pushToken: event.to.pushToken }
                notificationIDListener && notificationIDListener(data)
            }
        });
    }

    loadDeviceInfo(listener) {
        notificationIDListener = listener
        
        OneSignal.getDeviceState().then((deviceInfo) => {
            if (deviceInfo.isSubscribed) {
               
                let data = { userId: deviceInfo.userId, pushToken: deviceInfo.pushToken }
                notificationIDListener(data)
            }
           
        }).catch((error) => {
            
            console.log(error)
        })
    }

    setOnNewNotificationListener(onMessage) {
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notifReceivedEvent);
            let notif = notifReceivedEvent.getNotification();
            let message = {
                title: notif.title,
                body: notif.body,
                data: notif.additionalData,
            }
            onMessage(message)
            setTimeout(() => { notifReceivedEvent.complete(notif) }, 0)
        });

        OneSignal.setNotificationOpenedHandler((notifOpenEvent) => {
            console.log("On Open Notification open", notifOpenEvent)
        })
    }

    removeNotificationsFromTray() {
        if (Platform.OS == "android") {
            OneSignal.clearOneSignalNotifications()
        }
    }
}