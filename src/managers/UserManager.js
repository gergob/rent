import BaseManager from './BaseManager';

export default class UserManager extends BaseManager {
  constructor(apiBaseUrl) {
    super(apiBaseUrl);
    console.log('UserManager constructor invoked.');
    this.routes = {
      'login': 'api/login'
    }
  }

  login(email, password) {
    console.log('UserManager - login invoked with email=[' + email + '] and password=[' + password + ']');
    return fetch(this.getApiRoute('login'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
  }
}
