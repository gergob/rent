import React, { Component } from 'react';
import { StyleSheet, Platform, fonts, Text } from 'react-native';
import { Tabs, Tab } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Resume from './pages/Resume';
import Movies from './pages/Movies';
import Search from './pages/Search';
import Series from './pages/Series';
import Loading from './pages/Loading';
import Performance from './pages/Performance';
import Promotion from './pages/Promotion';

//
// The page names are coming from the API call, this is part of the protocol
//
const pageMapping = {
  'Resume': Resume,
  'Loading': Loading,
  'Movies': Movies,
  'Series': Series,
  'Search': Search,
  'Performance': Performance,
  'Promotion': Promotion
};

let styles = StyleSheet.create({
  titleStyle: {
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica'
      },
      android: {
        fontFamily: 'Helvetica'
      }
    })
  }
})

export default class NavBar extends Component {
  constructor () {
      super();
      this.state = {
        selectedTab: 'loading',
        menuItems:[{
          'action': 'accedo://page/loading',
          'id': 'loading',
          'state': '',
          'title': 'Loading',
          'page': 'Loading',
          'icon': 'cloud-download',
          'items': []
        }]
      }
      this.changeTab = this.changeTab.bind(this)
    }

    componentWillMount () {
      this.props.gaTracker.trackScreenView('NavBar');
      let self = this;
      this.props.dataManager.get('menu')
        .then((response) => {
          console.info('NavBar - Response from API arrived.');
          if(response.ok) {
            response.json()
              .then((menu) => {
                console.info('NavBar - Parsed data to JSON.');
                let menuItems = menu.config_menu.items;
                let selectedTab = menuItems[0].id; // this should be resume
                this.props.gaTracker.trackEvent('NavBar', 'menuLoaded', { 'label': 'nrOfMenuItems', 'value':  menuItems.length});
                self.setState({
                  selectedTab: selectedTab,
                  menuItems: menuItems
                });
              });
          }
          else {
            console.error('NavBar - Fetching from API failed, status:' + response.status);
          }
        });
    }

    changeTab (selectedTab) {
      this.props.gaTracker.trackEvent('NavBar', 'changeTab');
      this.setState({
        selectedTab
      });
    }

    render () {
      const { toggleSideMenu } = this.props
      const { selectedTab, menuItems } = this.state
      console.info('NavBar - render() invoked.');

      let innerTabs = menuItems.map((menuItem) => {
        var Component = pageMapping[menuItem.page];
        return (
          <Tab
            key={ menuItem.id }
            titleStyle={[styles.titleStyle]}
            selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
            selected={selectedTab === menuItem.id }
            title={selectedTab === menuItem.id ? menuItem.title : null}
            renderIcon={() => <Icon color={'grey'} name={menuItem.icon} size={26} />}
            renderSelectedIcon={() => <Icon color={'#00A4E4'} name={menuItem.icon} size={26} />}
            onPress={() => this.changeTab(menuItem.id)}>
            <Component
              dataManager={this.props.dataManager}
              routes={this.props.routes}
              navigator={this.props.navigator}
              gaTracker={this.props.gaTracker}/>
          </Tab>
        );
      });

      return (
        <Tabs hidesTabTouch style= {{flex:1}}>
          {innerTabs}
        </Tabs>
      );
  }
}
