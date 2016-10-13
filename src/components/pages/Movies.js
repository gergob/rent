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

import { Card, Button } from 'react-native-elements';

const Movies = React.createClass({
    getInitialState () {
        return {
          refreshing: false,
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
        }
    },

    loadData () {
      return this.props.dataManager.get('movie');
    },

    handleApiResponse (response) {
      console.info('Movie page - Response from API arrived.');
      let self = this;
      if(response.ok) {
        response.json()
          .then((movieItems) => {
            console.info('Movie page - Parsed data to JSON.');
            self.setState({
              refreshing: false,
              dataSource: self.state.dataSource.cloneWithRows(movieItems.items)
            });
          });
      }
      else {
        console.error('Movie page - Fetching from API failed, status:' + response.status);
      }
    },

    componentWillMount () {
      console.info('Movie page - componentWillMount() invoked.');
      console.info('Movie page - fetching menu details from API.');
      this.loadData().then(this.handleApiResponse);
    },

    renderRow (rowData, sectionID) {
      let self = this;
      //console.log(JSON.stringify(rowData));
      return (
        <Card
          key={rowData.id}
          title={rowData.title}
          image={{uri: self.props.dataManager.getApiBaseUrl() + rowData.imageSrc}}>
          <Text style={{marginBottom: 10}}>
            {rowData.description}
          </Text>
          <Button
            small
            icon={{name: 'play-circle-filled'}}
            backgroundColor='#00A4E4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='PLAY' />
        </Card>
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

export default Movies;
