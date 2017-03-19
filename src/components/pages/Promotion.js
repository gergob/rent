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

import { PricingCard, Button } from 'react-native-elements';

const Promotion = React.createClass({
    getInitialState () {
        return {
          refreshing: false,
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
        }
    },

    loadData () {
      return this.props.dataManager.get('promotion');
    },

    handleApiResponse (response) {
      console.info('Promotion page - Response from API arrived.');
      let self = this;
      if(response.ok) {
        response.json()
          .then((movieItems) => {
            console.info('Promotion page - Parsed data to JSON.');
            self.setState({
              refreshing: false,
              dataSource: self.state.dataSource.cloneWithRows(movieItems.items)
            });
          });
      }
      else {
        console.error('Promotion page - Fetching from API failed, status:' + response.status);
      }
    },

    componentWillMount () {
      console.info('Promotion page - componentWillMount() invoked.');
      console.info('Promotion page - fetching menu details from API.');
      this.props.gaTracker.trackScreenView('Promotion');
      this.loadData().then(this.handleApiResponse);
    },

    buyAsset (id) {
      console.info('Promotion page - buying asset ID:' + id);
      this.props.gaTracker.trackEvent('Promotion', 'buy', { 'label': 'assetId', 'value': id });
      let newRoute = this.props.routes[2];
      newRoute.assetId = id;
      console.log('Promotion page - created new route item with id:[' + newRoute.assetId + ']');
      this.props.navigator.push(newRoute);
    },

    renderRow (rowData, sectionID) {
      let self = this;
      return (
        <PricingCard
          color={parseFloat(rowData.promotionPrice) > 4.0 ? '#00A4E4' : '#00AF00'}
          title={rowData.title}
          price={'$' + rowData.promotionPrice}
          info={[rowData.description]}
          button={{ title: 'Buy ' + rowData.title, icon: 'shopping-cart' }}
          onButtonPress= {() => {
            self.buyAsset(rowData.id);
          }}>
        </PricingCard>
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

export default Promotion;
