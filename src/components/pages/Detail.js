import React, {Component} from 'react';
import {
    View,
    Alert,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
    ListView,
    RefreshControl
} from 'react-native';

import { Button, Text, Icon } from 'react-native-elements';
import DetailStyle from './DetailStyle';


const Detail = React.createClass({
    getInitialState() {
        return {
          assetId: 0,
          coverImageSrc: '',
          title: '',
          description: '',
          genre: '',
          type: ''
        }
    },

    loadData() {
        console.info('Detail page - loadData() invoked, with id:[' + this.state.assetId  + ']');
        return this.props.dataManager.getDetail({id: this.state.assetId});
    },

    handleApiResponse(response) {
        console.info('Detail page - Response from API arrived.');
        let self = this;
        if (response.ok) {
            response.json().then((detail) => {
                console.info('Detail page - Parsed data to JSON.');
                let asset = detail.items[0];
                self.setState({
                  assetId: self.state.assetId,
                  coverImageSrc: asset.imageSrc,
                  title: asset.title,
                  description: asset.description,
                  genre: asset.genre,
                  type: asset.type
                });
            });
        } else {
            console.error('Detail page - Fetching from API failed, status:' + response.status);
        }
    },

    componentWillMount() {
        console.info('Detail page - componentWillMount() invoked.');
        console.info('Detail page - fetching menu details from API.');
        this.setState({
          assetId: this.props.assetId,
          coverImageSrc: '',
          title: '',
          description: '',
          genre: '',
          type: ''
        }, () => {
          this.loadData().then(this.handleApiResponse);
        });
    },

    render() {
        var self = this;
        return (
            <View style={DetailStyle.container}>
                <Image style={DetailStyle.coverImage} source={{uri: self.props.dataManager.getApiBaseUrl() + self.state.coverImageSrc}} />

                <Text style={DetailStyle.title} h2>{self.state.title}</Text>
                <View style={{flexDirection:'row', alignItems: 'stretch', justifyContent: 'space-around'}}>
                  <View style={DetailStyle.type}>
                    <Icon name='local-movies' />
                    <Text>{self.state.type}</Text>
                  </View>
                  <View style={DetailStyle.genre}>

                    <Icon name='perm-media' />
                    <Text>{self.state.genre}</Text>
                  </View>

                </View>

                <Text style={DetailStyle.description}>{self.state.description}</Text>
                <Button
                  small
                  iconLeft
                  icon={{ name: 'play-circle-filled' }}
                  buttonStyle = {DetailStyle.button}
                  title={'Play'}
                  onPress= { () => {
                    console.log('Play pressed on Detail');
                  }}
                />
                <Button
                  small
                  iconLeft
                  icon={{ name: 'arrow-back' }}
                  buttonStyle = {DetailStyle.button}
                  title={'Back'}
                  onPress= { () => {
                    this.props.navigator.pop();
                  }}
                />
            </View>
        );
    }

});

export default Detail;
