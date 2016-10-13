export default class BaseManager {
  constructor(baseApiUrl) {
    console.log('BaseManager constructor invoked.');
    this.baseApiUrl = baseApiUrl;
    this.routes = {};
  }

  getApiRoute(key) {
    console.log('BaseManager - getApiRoute invoked with key=[' + key + ']');
    return this.baseApiUrl + (this.routes[key] || 'api/dummy');
  }
}
