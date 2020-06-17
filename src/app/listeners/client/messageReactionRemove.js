const { Listener } = require('discord-akairo');
const Logger = require('../../util/logger');

class MessageReactionRemoveListener extends Listener {
  constructor() {
    super('messageReactionRemove', {
      event: 'messageReactionRemove',
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
        const uuser = member.user;
        await member.roles.remove(SaucedRole, 'Reaction Role Remove');
        Logger.log(`Removed @Verified for ${uuser.username}`, { tag: 'REACTION ROLE REMOVE' });
      } catch (error) {
        Logger.error(error, { tag: 'REACTION ROLE REMOVE' }, error.stack);
      }
    }
  }
}

module.exports = MessageReactionRemoveListener;
