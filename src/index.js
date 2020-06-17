require('dotenv').config();

const path = require('path');

const { ShardingManager } = require('discord.js');

new ShardingManager(path.join(__dirname, 'bot.js'), {
  token: process.env.TOKEN,
}).spawn();
