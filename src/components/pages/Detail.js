import React, {Component} from 'react';
import {
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

import {Button} from 'react-native-elements';

const Detail = React.createClass({
    getInitialState() {
        return {
          assetId: 0
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
                self.setState({});
            });
        } else {
            console.error('Detail page - Fetching from API failed, status:' + response.status);
        }
    },

    componentWillMount() {
        console.info('Detail page - componentWillMount() invoked.');
        console.info('Detail page - fetching menu details from API.');
        this.setState({
          assetId: this.props.assetId
        }, () => {
          this.loadData().then(this.handleApiResponse);
        });
    },

    render() {
        return (
            <View>
                <Button
                  small
                  iconLeft
                  icon={{ name: 'code' }}
                  title={'Selected ID is [' + this.state.assetId + ']'}
                  onPress= { () => {
                    this.props.navigator.pop();
                  }}
                />

            </View>
        );
    }

});

export default Detail;
