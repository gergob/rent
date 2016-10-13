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

import { List, ListItem } from 'react-native-elements';



const Resume = React.createClass({
    getInitialState () {
        return {
          refreshing: false,
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
        }
    },

    loadData () {
      let endpoint = this.props.apiBaseUrl + 'api/resume';
      console.info('Resume page - API Endpoint is: [' + endpoint + ']');
      return fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
        .catch((error) => {
          console.error(error);
          Alert.alert(
            'Error',
            error);
        });
    },

    handleApiResponse (response) {
      console.info('Resume page - Response from API arrived.');
      let self = this;
      if(response.ok) {
        response.json()
          .then((resumeItems) => {
            console.info('Resume page - Parsed data to JSON.');

            self.setState({
              refreshing: false,
              dataSource: self.state.dataSource.cloneWithRows(resumeItems.items)
            });
          });
      }
      else {
        console.error('NavBar - Fetching from API failed, status:' + response.status);
      }
    },

    componentWillMount () {
      console.info('Resume page - componentWillMount() invoked.');
      console.info('Resume page - fetching menu details from API.');
      this.loadData().then(this.handleApiResponse);
    },

    renderRow (rowData, sectionID) {
      let self = this;
      //console.log(JSON.stringify(rowData));
      return (
        <ListItem
          roundAvatar
          key={rowData.id}
          title={rowData.title}
          subtitle={rowData.genre}
          avatar={{uri: self.props.apiBaseUrl + rowData.logoSrc}}
          rightIcon={rowData.finished ? {name: 'done'} : {name: 'chevron-right'}}
          onPress={() => {
            // TODO add navigation
            console.log('Pressed');
          }}
        />
      )
    },

    onListRefresh() {
     this.setState({
       refreshing: true,
       dataSource: this.state.dataSource
     });
     this.loadData().then(this.handleApiResponse);
   },

    render () {
      var self = this;
      return (
          <ListView
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onListRefresh}
            />
          }
            style= {{flex:1}}
            renderRow={this.renderRow}
            dataSource={this.state.dataSource}
          />

      );
    }
});

export default Resume;
