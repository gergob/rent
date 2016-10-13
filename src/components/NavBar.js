import React, { Component } from 'react';
import { StyleSheet, Platform, fonts, Text } from 'react-native';
import { Tabs, Tab } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Resume from './pages/Resume';
import Loading from './pages/Loading';

//
// The page names are coming from the API call, this is part of the protocol
//
const pageMapping = {
  'Resume': Resume,
  'Loading': Loading
};

let styles = StyleSheet.create({
  titleStyle: {
    ...Platform.select({
      ios: {
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
      console.info('NavBar - componentWillMount() invoked.');
      let endpoint = this.props.apiBaseUrl + 'api/menu';
      let self = this;
      console.info('NavBar - fetching menu details from API.');
      console.info('NavBar - API Endpoint is: [' + endpoint + ']');
      fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
        .then((response) => {
          console.info('NavBar - Response from API arrived.');
          if(response.ok) {
            response.json()
              .then((menu) => {
                console.info('NavBar - Parsed data to JSON.');
                let menuItems = menu.config_menu.items;
                let selectedTab = menuItems[0].id; // this should be resume
                self.setState({
                  selectedTab: selectedTab,
                  menuItems: menuItems
                });
              });
          }
          else {
            console.error('NavBar - Fetching from API failed, status:' + response.status);
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            'Error',
            error);
        });
    }

    changeTab (selectedTab) {
      this.setState({
        selectedTab
      })
    }

    render () {
      const { toggleSideMenu } = this.props
      const { selectedTab, menuItems } = this.state
      console.info('NavBar - render() invoked.');

      let innerTabs = menuItems.map((menuItem) => {
        var Component = pageMapping[menuItem.page];
        //console.warn('Mapped page value is:' + MappedPage);
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
            <Component />
          </Tab>
        );
      });

      return (
        <Tabs hidesTabTouch>
          {innerTabs}
        </Tabs>
      );
  }
}
