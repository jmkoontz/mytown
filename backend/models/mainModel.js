const db = require('../config/db');

module.exports = {
  getTown: function(name) {
    const qs = 'SELECT * FROM cities WHERE name = ?';

    return db.query(qs, name, (err, result) => {
      if (err) {
        return Promise.reject('UserError: connection failed');
      } else {
        return Promise.resolve(result);
      }
    });
  }
};
