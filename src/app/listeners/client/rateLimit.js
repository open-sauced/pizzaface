const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Logger = require('../../util/logger');

class RateLimitListener extends Listener {
  constructor() {
    super('rateLimit', {
      event: 'rateLimit',
      emitter: 'client',
      category: 'client',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async exec({
    timeout, limit, method, path, route,
  }) {
    const error = {
      timeout, limit, method, path, route,
    };

    Logger.warn(error, { level: 'RATE LIMIT' });

    // eslint-disable-next-line max-len
    const webhook = new Discord.WebhookClient(process.env.ERROR_HOOK_ID, process.env.ERROR_HOOK_TOKEN);

    const embed = new MessageEmbed()
      .setColor(0xfaf5f5)
      .setAuthor('Rate Limit')
      .setTimestamp()
      .addField('Time Out', timeout, true)
      .addField('Limit', limit, true)
      .addField('HTTP Method', method, true)
      .addField('Route', route)
      .addField('Path', path);

    // eslint-disable-next-line consistent-return
    return webhook.send({ embeds: [embed] });
  }
}

module.exports = RateLimitListener;
