const { Firebase } = require('firestore-db');

const database = new Firebase({
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY,
});

class Database {
  static get firestore() {
    return database.firebase.firestore();
  }

  static get firebase() {
    return database.firebase.database();
  }
}

module.exports = Database;
