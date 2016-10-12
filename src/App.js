import React, { Component } from 'react';
import { Text, View, StyleSheet, Navigator } from 'react-native';
import { Card, Button } from 'react-native-elements';

import UserManager from './UserManager';

import Login from './components/Login';
import NavBar from './components/NavBar';

const apiBaseUrl = 'http://192.168.1.183:8080/';
const userManager = new UserManager(apiBaseUrl);

const ROUTES = [
  { index: 0, 'comp': Login},
  { index: 1, 'comp': NavBar}
];

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends Component {
    renderScene (route, navigator) {
        let Component = ROUTES[route.index].comp;
        return <Component route={route} navigator={navigator} userManager={userManager} routes={ROUTES}/>;
      }

      render () {
         return (
             <Navigator
               routeStack= {ROUTES}
               style={ styles.container }
               initialRoute={ ROUTES[0] }
               renderScene={this.renderScene}
               configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
             />
         );
      }
}



export default App
