const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { captureException } = require('@sentry/node');
const Logger = require('../../util/logger');

class RateLimitListener extends Listener {
  constructor() {
    super('rateLimit', {
      event: 'rateLimit',
      emitter: 'client',
      category: 'client',
    });
  }

  async exec({
    timeout, limit, method, path, route,
  }) {
    const error = {
      timeout, limit, method, path, route,
    };
    const id = '';
    Logger.warn(error, { level: 'RATE LIMIT' });

    captureException(error);

    const webhook = await this.client.fetchWebhook(id).catch(() => null);
    if (!webhook) return;

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
