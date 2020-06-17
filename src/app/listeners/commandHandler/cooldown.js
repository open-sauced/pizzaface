const { Listener } = require('discord-akairo');
const Logger = require('../../util/logger');

class CooldownListener extends Listener {
  constructor() {
    super('cooldown', {
      event: 'cooldown',
      emitter: 'commandHandler',
      category: 'commandHandler',
    });
  }

  // eslint-disable-next-line consistent-return
  exec(message, command, remaining) {
    const time = remaining / 1000;
    const level = message.guild ? `${message.guild.name}/${message.author.tag}` : `${message.author.tag}`;
    Logger.info(`${command.id} ~ ${time}`, { level });

    if (message.guild ? message.channel.permissionsFor(this.client.user).has(['SEND_MESSAGES', 'EMBED_LINKS']) : true) {
      const embed = this.client.util.embed().setColor(0x0080ff)
        .setTitle('Slow it down!')
        .setDescription(`You can use this command again in **${time.toFixed(2)}** sec`);
      return message.util.send({ embed });
    }
  }
}

module.exports = CooldownListener;
