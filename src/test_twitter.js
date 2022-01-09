require('dotenv').config();

const TwitterClient = require('./app/twitter/twitter');
const client = new TwitterClient({user_id:"111217362,96386134,2751482296"});