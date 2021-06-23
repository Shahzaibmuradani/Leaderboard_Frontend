// import React, {useEffect, useRef} from 'react';
// import {
//   StyleSheet,
//   StatusBar,
//   KeyboardAvoidingView,
//   View,
//   Text,
// } from 'react-native';

// import 'react-native-gesture-handler';
// import {NavigationContainer} from '@react-navigation/native';
// import {showMessage} from 'react-native-flash-message';
// import FlashMessage from 'react-native-flash-message';
// //Redux
// import {Provider} from 'react-redux';
// import store from './src/store';
// import {loadUser} from './src/actions/auth';
// import DefaultStackScreen from './src/components/layout/DefaultStackScreen';
// import {ThemeColor} from './src/utils/Constant';
// import messaging from '@react-native-firebase/messaging';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// //import setAuthToken from './src/utils/setAuthToken';
// //import AsyncStorage from '@react-native-async-storage/async-storage';

// // if (AsyncStorage.token) {
// //   setAuthToken(AsyncStorage.token);
// // }
// const App = () => {
//   // const ref = React.useRef('yLocalFlashMesage');
//   // useEffect(() => {
//   //   messaging()
//   //     .hasPermission()
//   //     .then((enable) => {
//   //       messaging()
//   //         .getToken()
//   //         .then((token) => {
//   //           console.log('device====>', token);
//   //         });
//   //     });
//   //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   //     console.log('Message handled in the background!', remoteMessage);
//   //   });

//   //   messaging().onMessage(async (remoteMessage) => {
//   //     console.log('FCMServices A new FCM message arrived', remoteMessage);
//   //     let body = {
//   //       title: remoteMessage.notification.title,
//   //       description: remoteMessage.notification.body,
//   //       icon: 'success',
//   //       type: 'success',
//   //       duration: 2000,
//   //       backgroundColor: 'lightgreen',
//   //     };
//   //     alert(JSON.stringify({body}));
//   //   });
//   // }, []);

//   // useEffect(() => {
//   //   store.dispatch(loadUser());
//   // }, [loadUser]);r

//   // const checkPermission = (onRegister) => {
//   //   messaging()
//   //     .hasPermission()
//   //     .then((enable) => {
//   //       if (enable) {
//   //         this.getToken(onRegister);
//   //       } else {
//   //         this.requestPermission(onRegister);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log('FCMService Permission Rejected', error);
//   //     });
//   // };

//   return (
//     <>
//       <React.Fragment>
//         <StatusBar
//           backgroundColor={ThemeColor}
//           barStyle="light-content"></StatusBar>
//         <NavigationContainer>
//           <DefaultStackScreen />
//         </NavigationContainer>
//         {/* <FlashMessage ref={ref} /> */}
//       </React.Fragment>
//     </>
//   );
// };

// // const styles = StyleSheet.create({});

// export default App;

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import DefaultStackScreen from './src/components/layout/DefaultStackScreen';
import {ThemeColor} from './src/utils/Constant';

export default class App extends Component {
  componentDidMount = () => {
    messaging()
      .getToken()
      .then((token) => {
        console.log('FCM Token', token);
      });
  };

  render() {
    return (
      <React.Fragment>
        <StatusBar
          backgroundColor={ThemeColor}
          barStyle="light-content"></StatusBar>
        <NavigationContainer>
          <DefaultStackScreen />
        </NavigationContainer>
      </React.Fragment>
    );
  }
}
