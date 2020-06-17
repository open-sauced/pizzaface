const { Listener } = require('discord-akairo');
const Logger = require('../../util/logger');

class CommandStartedListener extends Listener {
  constructor() {
    super('commandStarted', {
      event: 'commandStarted',
      emitter: 'commandHandler',
      category: 'commandHandler',
    });
  }

  async exec(message, command) {
    this.counter(message, command);

    const level = message.guild ? `${message.guild.name}/${message.author.tag}` : `${message.author.tag}`;
    Logger.log(`${command.id}`, { level });
  }
}

module.exports = CommandStartedListener;
