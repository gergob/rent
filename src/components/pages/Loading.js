import React, { Component } from 'react';
import  {
    View,
    ActivityIndicator,
    StyleSheet
} from 'react-native';



const Loading = React.createClass({
    render () {
        return (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <ActivityIndicator
                size="large"
                color="#00A4E4"
              />
          </View>
        );
    }
});

export default Loading;
