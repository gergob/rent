### React Native Media POC (ReNT)

This React Native app has been created as part of Proof of Concept project through we analyzed how mature is the technology and how well could this be used in our environment.

### Running the app

 1. `brew install node`
 1. `brew install watchman`
 1. `npm install -g react-native-cli`
 1. `git clone https://github.com/gergob/rent`
 1. `cd rent`
 1. `npm install`
 1. `react-native run-ios` for iOS (make sure XCode is installed)
 1. `react-native run-android` for Android (make sure simulator is running and can be reached through `adb` or make sure you have a dev device connected)


### Feature list
 1. Authentication (dummy one, DO NOT USE IN PRODUCTION, for POC its OK)
 1. Media metadata browsing
 1. Media playback (only MP4)
 1. Search
 1. Performance / Stress testing
 1. Media playback (only MP4)



### Architecture

`TODO: Add`



### Backend service

The backend service is [SimpleOvpApi](https://github.com/gergob/SimpleOvpApi).

### Used Components

 * [React](https://github.com/facebook/react) `v15.4.1`
 * [React Native](https://github.com/facebook/react-native) `v0.40`
 * [React Native Elements](https://github.com/react-native-community/react-native-elements)
 * [React Native Video](https://github.com/react-native-community/react-native-video) `v1.0`
 * [React Native Google Analytics Bridge](https://github.com/idehub/react-native-google-analytics-bridge)
 * [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
