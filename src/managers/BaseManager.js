export default class BaseManager {

    constructor(apiBaseUrl) {
        console.log('BaseManager constructor invoked.');
        this.apiBaseUrl = apiBaseUrl;
        this.routes = {};
    }

    getApiRoute(key) {
        console.log('BaseManager - getApiRoute invoked with key=[' + key + ']');
        return this.apiBaseUrl + (this.routes[key] || 'api/dummy');
    }
}
