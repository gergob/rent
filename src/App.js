import React, { Component } from 'react';
import { Text, View, StyleSheet, Navigator } from 'react-native';
import { Card, Button } from 'react-native-elements';

import UserManager from './managers/UserManager';
import DataManager from './managers/DataManager';

import Login from './components/Login';
import NavBar from './components/NavBar';
import Detail from './components/pages/Detail';
import Player from './components/pages/Player';

const apiBaseUrl = 'http://10.0.253.21:8080/';
const userManager = new UserManager(apiBaseUrl);
const dataManager = new DataManager(apiBaseUrl);

const ROUTES = [
  { index: 0, 'comp': Login, name:'login' },
  { index: 1, 'comp': NavBar, name: 'navbar' },
  { index: 2, 'comp': Detail, name: 'detail' },
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

      if(routeElement.name === 'navbar') {
        return (
          <Component
            route={ route }
            navigator={ navigator }
            apiBaseUrl={ apiBaseUrl }
            dataManager={ dataManager }
            routes={ ROUTES }
          />
        );
      }
      else if (routeElement.name === 'login') {
        return (
          <Component
            route={ route }
            navigator={ navigator }
            userManager={ userManager }
            routes={ ROUTES }
          />
        );
      }
      else if (routeElement.name === 'detail') {
        return (
          <Component
            route={ route }
            navigator={ navigator }
            apiBaseUrl={ apiBaseUrl }
            dataManager={ dataManager }
            routes={ ROUTES }
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
          />
        );
      }

    }

    render () {
       return (
        <Navigator
          routeStack= { ROUTES }
          style={ styles.container }
          initialRoute={ ROUTES[1] }
          renderScene={ this.renderScene }
          configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
        />
      );
    }
}



export default App
