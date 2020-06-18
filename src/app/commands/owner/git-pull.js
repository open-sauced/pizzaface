const { Command } = require('discord-akairo');
const shell = require('shelljs');

// eslint-disable-next-line no-unused-vars
class GitPullCommand extends Command {
  constructor() {
    super('git-pull', {
      aliases: ['git-pull', 'sync', 'git'],
      category: 'owner',
      ownerOnly: true,
      description: {
        content: 'You can\'t use this anyway, so why explain?',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  exec(message) {
    const { stderr, stdout, code } = shell.exec('git pull');
    return message.channel.send([
      `${stderr}`,
      `${stdout}`,
      `Process exited with code ${code}`,
    ], { code: true, split: true });
  }
}

// module.exports = GitPullCommand;
