import BaseManager from './BaseManager';
import {Alert} from 'react-native';

export default class DataManager extends BaseManager {
    constructor(apiBaseUrl) {
        super(apiBaseUrl);
        console.log('DataManager constructor invoked.');

        this.routes = {
            'resume': 'api/resume',
            'menu': 'api/menu',
            'movie': 'api/movie',
            'serie': 'api/serie',
            'detail': 'api/detail',
            'search': 'api/search',
            'data': 'api/data',
        };

        this.userKey = null;
    }

    setUserKey(userKey) {
        this.userKey = userKey;
    }

    getApiBaseUrl() {
        return this.apiBaseUrl;
    }

    get(apiEndpointKey, params) {
        return this.load(apiEndpointKey, 'GET');
    }

    getDetail(params) {
        let endpoint = this.getApiRoute('detail');
        endpoint += '/' + params.id;
        console.info('DataManager - API Endpoint is: [' + endpoint + ']');
        return fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-SimpleOvpApi': this.userKey
            }
        }).catch(this.errorHandler);
    }

    getData(nrOfItems) {
        let endpoint = this.getApiRoute('data');
        endpoint += '/' + nrOfItems;
        console.info('DataManager - API Endpoint is: [' + endpoint + ']');
        return fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-SimpleOvpApi': this.userKey
            }
        }).catch(this.errorHandler);
    }

    search(keyword) {
        return this.post('search', {'keyword': keyword})
    }

    post(apiEndpointKey, body) {
        return this.load(apiEndpointKey, 'POST', body);
    }

    load(apiEndpointKey, method, body) {
        let endpoint = this.getApiRoute(apiEndpointKey);
        console.info('DataManager - API Endpoint is: [' + endpoint + ']');
        console.info('UserKey is:' + this.userKey);
        let uk = this.userKey;
        if (body) {
            return fetch(endpoint, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-SimpleOvpApi': uk
                },
                body: JSON.stringify(body)
            }).catch(this.errorHandler);
        }
        else {
            return fetch(endpoint, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-SimpleOvpApi': this.userKey
                }
            }).catch(this.errorHandler);
          }
    }

    errorHandler(error) {
        console.error(error);
        Alert.alert('Error', error);
    }

}
