import React, { Component } from 'react';
import  {
    View,
    Text,
    Alert,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import loginStyle from './LoginStyle';

const Login = React.createClass({
    getInitialState() {
        return {
          email: '',
          password: ''
        }
    },

    onPress () {
      this.props.userManager.login(this.state.email, this.state.password)
        .then((response) => {
          if(response.status == 200) {
            console.log('Login successful. Loading app...');
            this.props.navigator.jumpForward();
          }
          else if (response.status == 403) {
            console.warn('Unauthorized Login...email or password not correct.');
            Alert.alert(
              'Error',
              'Email or Password incorrect.'
            );
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            'Error',
            error);
        });
    },

    render () {
        return (
          <View style={loginStyle.container}>
            <View style={loginStyle.loginContainer}>
              <Image style={loginStyle.image} source={require('../../images/accedo.png')} />
              <TextInput
                style={loginStyle.input}
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
                placeholder={'Enter Email'}
                maxLength={50}
                multiline={false}
                />
                <TextInput
                  secureTextEntry={true}
                  style={loginStyle.input}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({password: text})}
                  placeholder={'Enter Password'}
                  maxLength={50}
                  multiline={false}
                />
              <TouchableHighlight
                style={loginStyle.button}
                underlayColor={'#FFF'}
                onPress={this.onPress}
                >
                <Text style={loginStyle.label}>LOGIN</Text>
              </TouchableHighlight>
            </View>
          </View>
        );
    }
});

export default Login;
