const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      event: 'ready',
      emitter: 'client',
      category: 'client',
      type: 'once',
    });

    this.once = false;
  }

  async exec() {
    this.client.user.setActivity('the sauce come in', { type: 'WATCHING' });
    this.client.logger.info(`${this.client.user.tag} (${this.client.user.id})`, { label: 'READY' });
    if (!this.once) {
      await Promise.all([
        this.client.firebase.init(),
      // eslint-disable-next-line no-return-assign
      ]).then(() => this.once = Boolean(true));
    }
  }
}

module.exports = ReadyListener;
