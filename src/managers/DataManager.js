import BaseManager from './BaseManager';
import { Alert } from 'react-native';

export default class DataManager extends BaseManager {
  constructor(apiBaseUrl) {
    super(apiBaseUrl);
    console.log('DataManager constructor invoked.');

    this.routes = {
      'resume': 'api/resume',
      'menu': 'api/menu',
      'movie': 'api/movie',
      'serie': 'api/serie',
      'detail': 'api/detail'
    }
  }

  getApiBaseUrl() {
    return this.apiBaseUrl;
  }

  get(apiEndpointKey, params) {
    return this.load(apiEndpointKey, 'GET');
  }

  getDetail(apiEndpointKey, params) {
    let endpoint = this.getApiRoute(apiEndpointKey);
    endpoint+= '/' + params.id;
    console.info('DataManager - API Endpoint is: [' + endpoint + ']');
    return fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }}).catch(this.errorHandler);
  }

  post(apiEndpointKey, body) {
    return this.load(apiEndpointKey, 'POST', body);
  }

  load(apiEndpointKey, method, body) {
    let endpoint = this.getApiRoute(apiEndpointKey);
    console.info('DataManager - API Endpoint is: [' + endpoint + ']');
    return fetch(endpoint, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }}).catch(this.errorHandler);
  }

  errorHandler(error) {
    console.error(error);
    Alert.alert(
      'Error',
      error);
  }

}
