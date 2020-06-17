/* eslint-disable consistent-return */
const { Listener } = require('discord-akairo');
const Logger = require('../../util/logger');

class MessageReactionAddListener extends Listener {
  constructor() {
    super('messageReactionAdd', {
      event: 'messageReactionAdd',
      emitter: 'client',
      category: 'client',
    });
  }

  async exec(reaction, user) {
    if (user.id === this.client.user.id) return;
    if (reaction.message.partial) await reaction.message.fetch();
    if (!reaction.message.guild) return;
    if (reaction.message.guild.id === '714698561081704529') {
      if (reaction.message.id !== '714907225252167740') return;
      if (reaction.emoji.id !== '714845664386875414') return;
      const SaucedRole = await reaction.message.guild.roles.cache.get('722811495808892949');
      const member = await reaction.message.guild.members.fetch(user);
      try {
        await member.roles.add(SaucedRole, 'Reaction Role Added');
        const uuser = member.user;
        Logger.log(`Added @Verified for ${uuser.username}`, { tag: 'REACTION ROLE ADD' });
      } catch (error) {
        Logger.error(error, { tag: 'REACTION ROLE ADD' }, error.stack);
      }
    }
  }
}

module.exports = MessageReactionAddListener;
