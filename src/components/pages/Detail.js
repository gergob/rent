import React, { Component } from 'react';
import  {
    View,
    Text,
    Alert,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
    ListView,
    RefreshControl
} from 'react-native';

import { Button } from 'react-native-elements';


const Detail = React.createClass({
  getInitialState () {
      return {

      }
  },

  loadData () {
    return this.props.dataManager.getDetail('detail', { id: this.props.id });
  },

  handleApiResponse (response) {
    console.info('Detail page - Response from API arrived.');
    let self = this;
    if(response.ok) {
      response.json()
        .then((detail) => {
          console.info('Detail page - Parsed data to JSON.');
          self.setState({

          });
        });
    }
    else {
      console.error('Detail page - Fetching from API failed, status:' + response.status);
    }
  },

  componentWillMount () {
    console.info('Detail page - componentWillMount() invoked.');
    console.info('Detail page - fetching menu details from API.');
    this.loadData().then(this.handleApiResponse);
  },

  render () {
    return (
      <View>
        <Button
          small
          iconLeft
          icon={{name: 'code'}}
          title='Back' />
      </View>
    );
  }

});

export default Detail;
