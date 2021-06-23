import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMServices {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  onMessageReceived = (message) => {
    // notifee.displayNotification(JSON.parse(message.data.notifee));
    // messaging().onMessage(onMessageReceived);
    // messaging().setBackgroundMessageHandler(onMessageReceived);
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enable) => {
        if (enable) {
          this.getToken(onRegister);
        } else {
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('FCMService Permission Rejected', error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log("FCMService User Doesn't have a device Token", error);
        }
      })
      .catch((error) => {
        console.log('FCMService getToken Rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('FCMService Request Permission Rejected', error);
      });
  };

  deleteToken = (onRegister) => {
    console.log('FCMService Delete Token', error);
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('FCMService Delete Token error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // when the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'FCMServices onNotificationOpenedApp Notification caused app to open',
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
        // this.removeDeliveredNotification(notification.notificationDd)
      }
    });

    // when the appliocation is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        //   console.log("FCMServices getInitialNotification Notification caused app to open")
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
          // this.removeDeliveredNotification(notification.notificationDd)
        }
      });

    //Forground state mesages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('FCMServices A new FCM message arrived', remoteMessage);

      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('FCMServices New Token refresh', fcmToken);
      onRegister(fcmToken);
    });

    messaging().onMessage(this.onMessageReceived);
    messaging().setBackgroundMessageHandler(this.onMessageReceived);
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMServices();
