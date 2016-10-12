import React, { Component } from 'react';

export default class UserManager {
  constructor(baseApiUrl) {

    this.baseApiUrl = baseApiUrl;
    console.log('UserManager constructor invoked.');

    this.routes = {
      'login': 'api/login'
    }
  }

  getApiRoute(key) {
    console.log('UserManager - getApiRoute invoked with key=[' + key + ']');
    return this.baseApiUrl + (this.routes[key] || 'api/dummy');
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
