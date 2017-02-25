import React, { Component } from 'react';
import  {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  row: {
   padding: 3,
   margin: 7,
   width: 105,
   height: 150,
   backgroundColor: '#F6F6F6',
   alignItems: 'center',
   borderWidth: 1,
   borderRadius: 5,
   borderColor: '#CCC'
  },
  logo: {
   width: 90,
   height: 120
  },
  text: {
   flex: 1,
   marginTop: 5,
   fontSize: 10,
   textAlign: 'center'
  }
});


const Performance = React.createClass({
  getInitialState () {
      return {
        refreshing: false,
        nrOfItems: '10',
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
      }
  },

  loadData (nrOfItems) {
    console.info('Performance page - loadData() invoked, nrOfItems is:' + nrOfItems);
    return this.props.dataManager.getData(nrOfItems);
  },

  handleApiResponse (response) {
    console.info('Performance page - Response from API arrived.');
    let self = this;
    if(response.ok) {
      response.json()
        .then((result) => {
          console.info('Performance page - Parsed data to JSON.');
          self.setState({
            refreshing: false,
            dataSource: self.state.dataSource.cloneWithRows(result.items)
          });
        });
    }
    else if (response.status === 404) {
      self.setState({
        refreshing: false,
        dataSource: self.state.dataSource.cloneWithRows([])
      });
    }
    else {
      console.error('Performance page - Fetching from API failed, status:' + response.status);
    }
  },

  openDetails (id) {
    console.info('Performance page - opening details page for asset ID:' + id);
    let newRoute = this.props.routes[2];
    newRoute.assetId = id;
    console.log('Performance page - created new route item with id:[' + newRoute.assetId + ']');
    this.props.gaTracker.trackEvent('Search', 'goToDetail', { 'label': 'assetId', 'value': id });
    this.props.navigator.push(newRoute);
  },

  componentWillMount () {
    console.info('Performance page - componentWillMount() invoked.');
    this.props.gaTracker.trackScreenView('Performance');
    this.loadData('10').then(this.handleApiResponse);
  },

  render: function() {
   var self = this;
   return (
      <View style={{flex:1, flexDirection:'column'}}>
        <SearchBar
          onChangeText={(text) => {
            if(text.length > 0) {
              self.loadData(text).then(this.handleApiResponse);
            }
          }}
          placeholder={'Enter a number here'}
          maxLength={4}
          keyboardType={'numeric'}
          lightTheme={true}
          autoCapitalize={'none'}
        />
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections={true}
        />

      </View>
   );
  },

  _renderRow: function(rowData: object, sectionID: number, rowID: number) {
    var self = this;
    return (
      <TouchableHighlight onPress={() => {
            self.openDetails(rowData.id);
          }} >
          <View style={styles.row} >
            <Image style={styles.logo} source={{uri: self.props.dataManager.getApiBaseUrl() + rowData.logoSrc}} />
            <Text style={styles.text}>
              {rowData.title}
            </Text>
          </View>
      </TouchableHighlight>
    );
  }

});

export default Performance;
