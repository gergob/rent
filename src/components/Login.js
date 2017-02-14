import React, { Component } from 'react';
import  {
    View,
    Text,
    Alert,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import loginStyle from './LoginStyle';

const Login = React.createClass({
    getInitialState() {
        return {
          email: '',
          password: '',
          isLoading: false
        }
    },

    componentWillMount() {
      this.props.gaTracker.trackScreenView('Login');
    },

    onPress () {
      this.setState({
        email: this.state.email,
        password: this.state.password,
        isLoading: true
      });
      let routes = this.props.routes;
      let navigator = this.props.navigator;

      if(!this.state.email || this.state.email.length === 0 ||
         !this.state.password || this.state.password.length === 0) {
           console.warn('Email or Password have to be filled out.');
           Alert.alert(
             'Error',
             'Email or Password have to be filled out.'
           );
           this.setState({
             email: '',
             password: '',
             isLoading: false
           });
           return;
      }
      this.props.gaTracker.trackEvent('Login', 'apiLogin');
      this.props.userManager.login(this.state.email, this.state.password)
        .then((response) => {
          if(response.status == 200) {
            console.log('Login successful. Loading app...');
            this.props.gaTracker.trackEvent('Login', 'apiLoginSuccess', { 'label': 'customerId', 'value': 1});
            navigator.replaceAtIndex(routes[1], 0, () => {
              console.info('Login - Login Navigator item has been replaced.');
            });
          }
          else if (response.status == 403) {
            console.warn('Unauthorized Login...email or password not correct.');
            this.props.gaTracker.trackEvent('Login', 'apiLoginFailed');
            Alert.alert(
              'Error',
              'Email or Password incorrect.'
            );
            this.setState({
              email: '',
              password: '',
              isLoading: false
            });
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            'Error',
            error);
          this.setState({
            email: '',
            password: '',
            isLoading: true
          });
        });
    },

    render () {
        return (
          <View style={loginStyle.container}>
            <View style={loginStyle.loginContainer}>
              <Image style={loginStyle.image} source={require('../../images/accedo.png')} />
              <TextInput
                style={loginStyle.input}
                autoCapitalize="none"
                onSubmitEditing={(event) => this.setState({email: event.nativeEvent.text})}
                placeholder={'Enter Email'}
                maxLength={50}
                multiline={false}
                />
              <TextInput
                secureTextEntry={true}
                style={loginStyle.input}
                autoCapitalize="none"
                onSubmitEditing={(event) => this.setState({password: event.nativeEvent.text})}
                placeholder={'Enter Password'}
                maxLength={50}
                multiline={false}
              />
              <TouchableHighlight
                style={loginStyle.button}
                underlayColor={'#FFF'}
                onPress={this.onPress}
                disabled={this.state.isLoading}>
                <Text style={loginStyle.label}>LOGIN</Text>
              </TouchableHighlight>
              <ActivityIndicator
                animating={this.state.isLoading}
                size='large'
                color='#00A4E4'
                style={loginStyle.activityIndicator}
              />
            </View>
          </View>
        );
    }
});

export default Login;
