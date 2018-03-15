import {http as defaultConfig} from '../../config/app.config'
import _ from 'lodash'
import base64 from 'base-64'
export default class {
  constructor (config) {
    config = _.defaults(config, defaultConfig)
    this.fetchConfig = {
      url: config.url,
      method: config.hasOwnProperty('method') ? config.method : 'GET',
      credentials: config.hasOwnProperty('credentials') ? config.credentials : 'same-origin',
      mode: config.hasOwnProperty('mode') ? config.mode : 'no-cors',
      headers: new Headers()
    }
    if (config.hasOwnProperty('data')) {
      // If we'll send JSON
      if (config.dataType === 'json') {
        this.fetchConfig.headers.append('Content-Type', 'application/json')
        this.fetchConfig.body = JSON.stringify(config.data)
      // If we'll send formData
      } else {
        let payload = new FormData()
        for (let chunk in config.data) {
          if (config.data.hasOwnProperty(chunk)) payload.append(chunk, config.data[chunk])
        }
        this.fetchConfig.body = payload
      }
    }
  }
}

export default {
  instance (config) {
    config = _.defaults(config, defaultConfig)
    let fetchConfig = {
      method: config.hasOwnProperty('method') ? config.method : 'GET',
      credentials: config.hasOwnProperty('credentials') ? config.credentials : 'same-origin',
      mode: config.hasOwnProperty('mode') ? config.mode : 'no-cors',
      headers: new Headers()
    }
    if (config.hasOwnProperty('authorization')) {
      const login = config.authorization.login
      const password = config.authorization.password
      fetchConfig.headers.append('Authorization', `basic ${base64.encode(`${login}:${password}`)}`)
    }
    if (config.hasOwnProperty('data')) {
      // If we'll send JSON
      if (config.dataType === 'json') {
        fetchConfig.headers.append('Content-Type', 'application/json')
        fetchConfig.body = JSON.stringify(config.data)
        // If we'll send formData
      } else {
        let payload = new FormData()
        for (let chunk in config.data) {
          if (config.data.hasOwnProperty(chunk)) payload.append(chunk, config.data[chunk])
        }
        fetchConfig.body = payload
      }
    }
    return fetch(config.url, fetchConfig).then(response => response.json())
  },
  install (Vue) {
    Vue.prototype.$http = this.instance()
  }
}
