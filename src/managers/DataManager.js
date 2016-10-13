import BaseManager from './BaseManager';

export default class DataManager extends BaseManager {
  constructor(baseApiUrl) {
    super(baseApiUrl);
    console.log('DataManager constructor invoked.');

    this.routes = {
      'login': 'api/login'
    }
  }
