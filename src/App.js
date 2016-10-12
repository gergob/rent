import React, { Component } from 'react';
import { Text, View, StyleSheet, Navigator } from 'react-native';
import { Card, Button } from 'react-native-elements';

import UserManager from './UserManager';

import Login from './components/Login';

const apiBaseUrl = 'http://192.168.1.183:8080/';
const userManager = new UserManager(apiBaseUrl);

const ROUTES = {
  'login': Login
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class App extends Component {
    renderScene (route, navigator) {
        let Component = ROUTES[route.name];
        return <Component route={route} navigator={navigator} userManager={userManager} />;
      }

      render () {
         return (
             <Navigator
               style={ styles.container }
               initialRoute={ {name: 'login'} }
               renderScene={this.renderScene}
               configureScene={ () => { return Navigator.SceneConfigs.FloatFromRight; } }
             />
         );
      }
}



export default App
