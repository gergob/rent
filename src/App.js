import React, { Component } from 'react';
import { Text, View } from 'react-native';

class App extends Component {
  render() {
    return (
      <View >
        <Text >
          Welcome to React Native!
        </Text>
        <Text >
          To get started, edit index.android.js or index.ios.js
        </Text>
        <Text >
          Double tap R on your keyboard to reload,{'\n'}
          Cmd + R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

export default App
