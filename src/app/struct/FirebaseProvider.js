/* eslint-disable no-empty-pattern */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
const { Provider } = require('discord-akairo');
const admin = require('firebase-admin');

class FirebaseProvider extends Provider {
  constructor(database, {} = {}) {
    super();
    this.database = database;
  }

  async init() {
    await this.database.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.items.set(doc.id, doc.data());
      });
    });
  }

  entries(object) {
    if (!object) return Object.entries({});
    return Object.entries(object);
  }

  get(id, key, defaultValue) {
    if (this.items.has(id)) {
      const value = this.items.get(id)[key];
      return value == null ? defaultValue : value;
    }
    return defaultValue;
  }

  set(id, key, value) {
    const data = this.items.get(id) || {};
    data[key] = value;
    this.items.set(id, data);
    return this.database.doc(id).set({ [key]: value }, { merge: true });
  }

  delete(id, key) {
    const data = this.items.get(id) || {};
    delete data[key];
    return this.database.doc(id).set({ [key]: admin.firestore.FieldValue.delete() }, { merge: true });
  }

  clear(id) {
    this.items.delete(id);
    return this.database.doc(id).delete();
  }
}

module.exports = FirebaseProvider;
