import React, { Component } from 'react';
import { Text, View, StyleSheet, Navigator } from 'react-native';
import { Card, Button } from 'react-native-elements';

import UserManager from './managers/UserManager';
import DataManager from './managers/DataManager';

import Login from './components/Login';
import NavBar from './components/NavBar';

const apiBaseUrl = 'http://192.168.0.11:8080/';
const userManager = new UserManager(apiBaseUrl);
const dataManager = new DataManager(apiBaseUrl);

const ROUTES = [
  { index: 0, 'comp': Login, name:'login'},
  { index: 1, 'comp': NavBar, name: 'navbar'}
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
    }

    render () {
       return (
        <Navigator
          routeStack= { ROUTES }
          style={ styles.container }
          initialRoute={ ROUTES[0] }
          renderScene={ this.renderScene }
          configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
        />
      );
    }
}



export default App
