import React, { Component } from 'react';
import  {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
} from 'react-native';

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
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
      }
  },

  loadData () {
    return this.props.dataManager.search('evil');
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
    else {
      console.error('Movie page - Fetching from API failed, status:' + response.status);
    }
  },

  componentWillMount () {
    console.info('Movie page - componentWillMount() invoked.');
    console.info('Movie page - fetching menu details from API.');
    this.loadData().then(this.handleApiResponse);
  },

  render: function() {
   return (
     // ListView wraps ScrollView and so takes on its properties.
     // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
     <ListView contentContainerStyle={styles.list}
       dataSource={this.state.dataSource}
       renderRow={this._renderRow}
     />
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
