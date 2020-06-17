const { Listener } = require('discord-akairo');
const Logger = require('../../util/logger');

class ErrorListener extends Listener {
  constructor() {
    super('error', {
      event: 'error',
      emitter: 'commandHandler',
      category: 'commandHandler',
    });
  }

  async exec(error, message, command) {
    const level = message.guild ? `${message.guild.name} - ${message.guild.id}/${message.author.tag} - ${message.author.id}` : `${message.author.tag}`;
    Logger.error(`${command.id} ~ ${error}`, { level });
    Logger.stacktrace(error);

    if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
      await message.channel.send(error, { code: true });
    }
  }
}

module.exports = ErrorListener;
