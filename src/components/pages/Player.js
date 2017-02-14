import React, { Component } from 'react';
import Video from 'react-native-video';
import  {
    View,
    Text,
    Alert,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
    ListView,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { Button, Icon } from 'react-native-elements';

import PlayerStyle from './PlayerStyle';

const Player = React.createClass({
  getInitialState () {
    return {
      videoId: 0,
      videoSrc: '',
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0
    }
  },

  componentWillMount () {
    console.info('Player page - componentWillMount() invoked.');
    this.props.gaTracker.trackScreenView('Player');
    this.props.gaTracker.trackEvent('Player', 'play', { 'label': 'assetId', 'value': this.props.videoId });
    this.setState({
      videoId: this.props.videoId,
      videoSrc: this.props.videoSrc
    });
  },

  onLoad(data) {
    this.setState({duration: data.duration});
  },

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  },

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  },


  renderResizeModeControl(resizeMode) {
   const isSelected = (this.state.resizeMode == resizeMode);
   if(resizeMode === 'stretch') {
      return (
        <Icon
          name='panorama-horizontal'
          color= {isSelected ? '#00A4E4' : '#FFF'}
          onPress={() => {
            this.setState({resizeMode: resizeMode});
          }}
        />
     )
   }
   else if(resizeMode === 'cover') {
      return (
        <Icon
          name='tv'
          color= {isSelected ? '#00A4E4' : '#FFF'}
          onPress={() => {
            this.setState({resizeMode: resizeMode});
          }}
        />
     )
   }
   else if(resizeMode === 'contain'){
     return (
       <Icon
          name='launch'
          color= {isSelected ? '#00A4E4' : '#FFF'}
          onPress={() => {
            this.setState({resizeMode: resizeMode})
          }} />
     )
   }
  },

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={PlayerStyle.container}>
          <Video source={{uri: this.props.videoSrc}}
                 style={PlayerStyle.fullScreen}
                 rate={this.state.rate}
                 paused={this.state.paused}
                 volume={this.state.volume}
                 muted={this.state.muted}
                 resizeMode={this.state.resizeMode}
                 onLoad={this.onLoad}
                 onProgress={this.onProgress}
                 onEnd={() => { console.log('Done!') }}
                 repeat={true} />

        <View style={PlayerStyle.controls}>
          <View style={PlayerStyle.generalControls}>

            <View style={PlayerStyle.playerControl}>
              <Button
                 icon={{ name:!this.state.paused ? 'pause-circle-outline' :'play-circle-outline', color:'#00A4E4'}}
                 title={ !this.state.paused ? 'PAUSE' : 'PLAY' }
                 color='#00A4E4'
                 backgroundColor='transparent'
                 onPress={() => {
                   this.setState({paused: !this.state.paused})
                 }}
              />
            </View>

            <View style={PlayerStyle.resizeModeControl}>
              {this.renderResizeModeControl('cover')}
              {this.renderResizeModeControl('contain')}
              {this.renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={PlayerStyle.trackingControls}>
            <View style={PlayerStyle.progress}>
              <View style={[PlayerStyle.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[PlayerStyle.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>
          </View>
        </View>
      </View>
    );
  }
});


export default Player;
