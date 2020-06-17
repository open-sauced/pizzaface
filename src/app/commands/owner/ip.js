const { Command } = require('discord-akairo');
const http = require('http');

class IPCommand extends Command {
  constructor() {
    super('ip', {
      aliases: ['ip'],
      category: 'owner',
      ownerOnly: true,
      description: {
        content: 'My IP',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async exec(message) {
    http.get({ host: 'api.ipify.org', port: 80, path: '/' }, (resp) => {
      resp.on('data', (ip) => {
        message.util.send(`My public IP address is: ${ip}`);
      });
    });
  }
}

module.exports = IPCommand;
