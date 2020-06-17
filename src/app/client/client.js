const {
  AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler,
} = require('discord-akairo');
const SettingsProvider = require('../struct/SettingsProvider');
const { firestore } = require('../struct/Database');
const Firebase = require('../struct/Firebase');
const Logger = require('../util/Logger_');

class Client extends AkairoClient {
  constructor(config) {
    super({ ownerID: config.owners }, {
      messageCacheMaxSize: 50,
      messageCacheLifetime: 300,
      messageSweepInterval: 600,
      disableEveryone: true,
      disabledEvents: ['TYPING_START'],
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    });

    this.logger = new Logger(this);

    this.commandHandler = new CommandHandler(this, {
      directory: './src/app/commands',
      aliasReplacement: /-/g,
      prefix: (message) => this.settings.get(message.guild, 'prefix', '?'),
      allowMention: true,
      fetchMembers: true,
      commandUtil: true,
      commandUtilLifetime: 3e5,
      commandUtilSweepInterval: 6e5,
      handleEdits: true,
      defaultCooldown: 3000,
    });

    this.inhibitorHandler = new InhibitorHandler(this, { directory: './src/app/inhibitors' });
    this.listenerHandler = new ListenerHandler(this, { directory: './src/app/listeners' });

    setInterval(() => {
      // eslint-disable-next-line no-restricted-syntax
      for (const guild of this.guilds.values()) {
        guild.presences.clear();
      }
    }, 1000 * 60 * 60);
  }

  async init() {
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.commandHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();

    this.firebase = new Firebase(this);
    this.settings = new SettingsProvider(firestore.collection('settings'));

    await this.settings.init();
  }

  async start(token) {
    await this.init();
    return this.login(token);
  }
}

module.exports = Client;
