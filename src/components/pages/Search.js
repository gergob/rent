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


const Search = React.createClass({
  getInitialState () {
      return {
        refreshing: false,
        keyword: '',
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
      }
  },

  loadData (keyword) {
    console.info('Search page - loadData() invoked, search keyword is:' + keyword);
    return this.props.dataManager.search(keyword);
  },

  handleApiResponse (response) {
    console.info('Search page - Response from API arrived.');
    let self = this;
    if(response.ok) {
      response.json()
        .then((searchResult) => {
          console.info('Search page - Parsed data to JSON.');
          self.setState({
            refreshing: false,
            dataSource: self.state.dataSource.cloneWithRows(searchResult.items)
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
      console.error('Movie page - Fetching from API failed, status:' + response.status);
    }
  },

  componentWillMount () {
    console.info('Search page - componentWillMount() invoked.');
    this.loadData('').then(this.handleApiResponse);
  },

  render: function() {
    var self = this;
   return (
      <View style={{flex:1, flexDirection:'column'}}>
        <SearchBar
          onChangeText={(text) => {
            if(text.length === 0 || text.length >= 3) {
              self.loadData(text).then(this.handleApiResponse);
            }
          }}
          placeholder={'Enter search keyword'}
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

  _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    var self = this;
    return (
      <TouchableHighlight onPress={() => console.log(rowID)} >
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




export default Search;
