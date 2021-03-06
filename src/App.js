import React, { Component } from 'react';
import { Text, View, StyleSheet, Navigator, BackAndroid, StatusBar } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import UserManager from './managers/UserManager';
import DataManager from './managers/DataManager';

import Login from './components/Login';
import NavBar from './components/NavBar';
import Detail from './components/pages/Detail';
import Player from './components/pages/Player';

const apiBaseUrl = 'https://react-rent.herokuapp.com/';
//const apiBaseUrl = 'http://192.168.1.103:8080/';

const userManager = new UserManager(apiBaseUrl);
const dataManager = new DataManager(apiBaseUrl);
const gaTracker = new GoogleAnalyticsTracker('UA-85362647-2');

const ROUTES = [
  { index: 0, 'comp': Login, name:'login' },
  { index: 1, 'comp': NavBar, name: 'navbar' },
  { index: 2, 'comp': Detail, name: 'detail', assetId: 0 },
  { index: 3, 'comp': Player, name: 'player', videoId: 0, videoSrc: '' }
];

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends Component {
    renderScene (route, navigator) {

      let routeElement = ROUTES[route.index];
      let Component = routeElement.comp;

      //
      // ANDROID BACK KEY HANDLER
      //
      BackAndroid.addEventListener('hardwareBackPress', function() {
        let currentRoutes = navigator.getCurrentRoutes();
        if(currentRoutes) {
           if (currentRoutes.length == 1 && currentRoutes[0].name === 'login') {
            BackAndroid.exitApp();
          } else if (currentRoutes.length > 0) {
            navigator.pop();
            return true;
          }
        }
        return false;
      });

      if(routeElement.name === 'navbar') {
        return (
          <Component
            route={ route }
            navigator={ navigator }
            apiBaseUrl={ apiBaseUrl }
            dataManager={ dataManager }
            routes={ ROUTES }
            gaTracker = { gaTracker }
          />
        );
      }
      else if (routeElement.name === 'login') {
        return (
          <Component
            route={ route }
            navigator={ navigator }
            userManager={ userManager }
            dataManager= { dataManager }
            routes={ ROUTES }
            gaTracker = { gaTracker }
          />
        );
      }
      else if (routeElement.name === 'detail') {
        return (
          <Component
            assetId={ routeElement.assetId }
            route={ route }
            navigator={ navigator }
            apiBaseUrl={ apiBaseUrl }
            dataManager={ dataManager }
            routes={ ROUTES }
            gaTracker = { gaTracker }
          />
        );
      }
      else if (routeElement.name === 'player') {
        return (
          <Component
            videoId={ routeElement.videoId }
            videoSrc={ routeElement.videoSrc }
            route={ route }
            navigator={ navigator }
            apiBaseUrl={ apiBaseUrl }
            dataManager={ dataManager }
            routes={ ROUTES }
            gaTracker = { gaTracker }
          />
        );
      }
    }

    render () {
      return (
        <View style={ styles.container }>
           <StatusBar hidden={ true } />
           <Navigator
            routeStack= { ROUTES }
            initialRoute={ ROUTES[0] }
            renderScene={ this.renderScene }
            configureScene={ () => { return Navigator.SceneConfigs.FadeAndroid; } }
          />
        </View>
      );
    }
}

export default App;
