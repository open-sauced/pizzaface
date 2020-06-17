require('dotenv').config();

const Client = require('./app/client/client');

const client = new Client({ owners: process.env.OWNERS.split(',') });

client.on('error', (error) => client.logger.error(`[CLIENT ERROR] ${error}`));
client.on('warn', (warn) => client.logger.warn(`[CLIENT WARN] ${warn}`));

client.start(process.env.TOKEN).then(client.logger.info('[LOGIN] Successfully logged into Discord API')).catch((error) => client.logger.error(error));

process.on('unhandledRejection', (error) => client.logger.error(`[UNHANDLED REJECTION] ${error}`));
