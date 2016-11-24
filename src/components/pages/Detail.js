import React, {Component} from 'react';
import {
    View,
    ScrollView,
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
          type: '',
          videoSrc: '',
          actors: '',
          director: '',
          rating: null,
          releaseDate: '',
          videoLength: null
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
                  type: asset.type,
                  videoSrc: asset.videoSrc,
                  actors: asset.actors && asset.actors.length > 0 ? asset.actors.join(",") : '',
                  director: asset.director,
                  rating: asset.rating,
                  releaseDate: asset.releaseDate,
                  videoLength: asset.length
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
          type: '',
          videoSrc: '',
          actors: '',
          director: '',
          rating: null,
          releaseDate: '',
          videoLength: null
        }, () => {
          this.loadData().then(this.handleApiResponse);
        });
    },

    openPlayer (id, videoSrc) {
      console.log('Detail page - Pressed item with id:[' + id + '] and videoSrc:[' + videoSrc + ']');
      let newRoute = this.props.routes[3];
      newRoute.videoId = id;
      newRoute.videoSrc = videoSrc;
      console.log('Detail page - Created new route item with id:[' + newRoute.videoId + '] and videoSrc:[' + newRoute.videoSrc + ']');
      this.props.navigator.push(newRoute);
    },

    render() {
        var self = this;
        return (
            <ScrollView style={DetailStyle.container}>
                <Image style={DetailStyle.coverImage} source={{uri: self.props.dataManager.getApiBaseUrl() + self.state.coverImageSrc}} />

                <View style={{flexDirection:'column', alignItems: 'flex-start', marginLeft:10, justifyContent: 'space-around'}}>
                  <Text style={DetailStyle.title} h2>{self.state.title}</Text>

                  <View style={DetailStyle.type}>
                    <Icon name='local-movies' />
                    <Text style={DetailStyle.textValue}>{self.state.type}</Text>
                  </View>

                  <View style={DetailStyle.genre}>
                    <Icon name='perm-media' />
                    <Text style={DetailStyle.textValue}>{self.state.genre}</Text>
                  </View>



                  <View style={DetailStyle.genre}>
                    <Icon name='person-pin' />
                    <Text style={DetailStyle.textValue}>{self.state.director}</Text>
                  </View>

                  <View style={DetailStyle.genre}>
                    <Icon name='stars' />
                    <Text style={DetailStyle.textValue}>ImDb Rating:</Text>
                    <Text style={DetailStyle.textValue}>{self.state.rating}</Text>
                  </View>

                  <View style={DetailStyle.genre}>
                    <Icon name='access-time' />
                    <Text style={DetailStyle.textValue}>{self.state.videoLength}</Text>
                  </View>

                  <View style={DetailStyle.genre}>
                    <Icon name='new-releases' />
                    <Text style={DetailStyle.textValue}>{self.state.releaseDate}</Text>
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
                    self.openPlayer(self.state.assetId, self.state.videoSrc);
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
            </ScrollView>
        );
    }

});

export default Detail;
