import React, { Component } from 'react';
import { StyleSheet, Platform, fonts, Text } from 'react-native';
import { Tabs, Tab } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Resume from './pages/Resume';

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
      super()
      this.state = {
        selectedTab: 'home'
      }
      this.changeTab = this.changeTab.bind(this)
    }
    changeTab (selectedTab) {
      this.setState({
        selectedTab
      })
    }

    render() {
      const { toggleSideMenu } = this.props
      const { selectedTab } = this.state
      return (
        <Tabs hidesTabTouch>
          <Tab
            titleStyle={[styles.titleStyle]}
            selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
            selected={selectedTab === 'home'}
            title={selectedTab === 'home' ? 'HOME' : null}
            renderIcon={() => <Icon color={'grey'} name='whatshot' size={26} />}
            renderSelectedIcon={() => <Icon color={'blue'} name='whatshot' size={26} />}
            onPress={() => this.changeTab('home')}>
            <Resume />
          </Tab>
          <Tab
            tabStyle={selectedTab !== 'about' && { marginBottom: -6 }}
            titleStyle={[styles.titleStyle, {marginTop: -1}]}
            selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
            selected={selectedTab === 'about'}
            title={selectedTab === 'about' ? 'ABOUT' : null}
            renderIcon={() => <Icon style={{paddingBottom: 4}} color={'grey'} name='important-devices' size={26} />}
            renderSelectedIcon={() => <Icon color={'blue'} name='important-devices' size={26} />}
            onPress={() => this.changeTab('about')}>
                <Resume />
          </Tab>
          <Tab
            tabStyle={selectedTab !== 'contact' && { marginBottom: -6 }}
            titleStyle={[styles.titleStyle, {marginTop: -1}]}
            selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
            selected={selectedTab === 'contact'}
            title={selectedTab === 'contact' ? 'CONTACT' : null}
            renderIcon={() => <Icon style={{paddingBottom: 4}} color={'grey'} name='contacts' size={26} />}
            renderSelectedIcon={() => <Icon color={'blue'} name='contacts' size={26} />}
            onPress={() => this.changeTab('contact')}>
              <Resume />
          </Tab>
          <Tab
            tabStyle={selectedTab !== 'pricing' && { marginBottom: -6 }}
            titleStyle={[styles.titleStyle, {marginTop: -1}]}
            selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
            selected={selectedTab === 'pricing'}
            title={selectedTab === 'pricing' ? 'PRICING' : null}
            renderIcon={() => <Icon style={{paddingBottom: 4}} color={'grey'} name='attach-money' size={26} />}
            renderSelectedIcon={() => <Icon color={'blue'} name='attach-money' size={26} />}
            onPress={() => this.changeTab('pricing')}>
              <Resume />
          </Tab>
        </Tabs>
      );
  }
}
