const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class Activity extends Command {
  constructor() {
    super('setactivity', {
      aliases: ['set-a'],
      category: 'owner',
      ownerOnly: true,
      description: {
        // eslint-disable-next-line no-useless-escape
        content: 'Sets the\'\s activity',
        usage: '<Activity> <Type>',
        examples: ['Watching Youtube'],
      },
      args: [{
        id: 'type',
        match: 'content',
        prompt: {
          start: 'Please select the type (PLAYING/WATCHING/LISTENING)',
          retry: 'Bruh',
        },

      },
      {
        id: 'activity',
        match: 'content',
        prompt: {
          start: 'Please enter the activity',
          retry: 'WRITE SOMETHING....STUPID!',
        },
      }],
    });
  }

  async exec(message, { activity, type }) {
    const Type = type.toUpperCase();
    this.client.user.setActivity(`${activity}`, { type: `${Type}` });

    const embed = new MessageEmbed().setColor('#812fd1')
      .addField('Success!', `**Type:** ${Type}\n**Activity:** ${activity}`);
    return message.util.send(embed);
  }
}

module.exports = Activity;
