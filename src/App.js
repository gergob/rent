import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

class App extends Component {
  render() {
    return (
      // implemented with Text and Button as children
      <Card
        title='HELLO WORLD'
        image={require('../images/accedo.png')}
        imageStyle={{height:90}}>
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          small
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
      </Card>
    );
  }
}

export default App
