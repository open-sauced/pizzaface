/* eslint-disable class-methods-use-this */
const Logger = require('../util/logger');
const { firebase } = require('./Database');
require('moment-duration-format');

class Firebase {
  constructor(client, { checkRate = 5 * 60 * 1000 } = {}) {
    this.client = client;
    this.checkRate = checkRate;
  }

  async init() {
    return true;
  }

  async commands(command) {
    return firebase.ref('commands')
      .child(command)
      .transaction((usage) => {
        if (usage === null) return 1;
        return usage + 1;
      }, (error) => {
        if (error) Logger.error(error, { level: 'FIREBASE' });
      });
  }

  async users(user) {
    return firebase.ref('users')
      .child(user)
      .transaction((usage) => {
        if (usage === null) return 1;
        return usage + 1;
      }, (error) => {
        if (error) Logger.error(error, { level: 'FIREBASE' });
      });
  }

  async guilds(guild) {
    return firebase.ref('guilds')
      .child(guild)
      .transaction((usage) => {
        if (usage === null) return 1;
        return usage + 1;
      }, (error) => {
        if (error) Logger.error(error, { level: 'FIREBASE' });
      });
  }
}

module.exports = Firebase;
