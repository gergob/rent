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

    openPlayer (id, videoSrc) {
      console.log('Pressed item with id:[' + id + '] and videoSrc:[' + videoSrc + ']');
      let newRoute = this.props.routes[3];
      newRoute.videoId = id;
      newRoute.videoSrc = videoSrc;
      console.log('Created new router item with id:[' + newRoute.videoId + '] and videoSrc:[' + newRoute.videoSrc + ']');
      this.props.navigator.push(newRoute);
    },

    openDetails (id) {

    },

    renderRow (rowData, sectionID) {
      let self = this;
      return (
        <Card
          key={rowData.id}
          title={rowData.title}
          titleStyle={{color:'#00A4E4', fontSize:18}}
          image={{uri: self.props.dataManager.getApiBaseUrl() + rowData.imageSrc}}>
          <Text style={{marginBottom: 10}}>
            {rowData.description}
          </Text>
          <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
            <Button
              small
              icon={{name: 'play-circle-filled'}}
              backgroundColor='#00A4E4'
              buttonStyle= {{width:120}}
              onPress= {() => {
                self.openPlayer(rowData.id, rowData.videoSrc);
              }}
              title='PLAY' />
            <Button
              small
              icon={{name: 'launch'}}
              backgroundColor='#00A4E4'
              buttonStyle= {{width:120}}
              onPress= {() => {
                self.openDetails(rowData.id);
              }}
              title='DETAIL' />
            </View>
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
