const Database = require('../config/db');

module.exports = {
  getTown: function(town) {
    let db = new Database();
    const qs = 'SELECT * FROM cities WHERE name = ?';

    return db.query(qs, [town])
      .then((result) => {
        let towns = [];
        for (let row in result) {
          towns.push(JSON.stringify(result[row]))
        }
        return JSON.stringify(result);
      });
  },

  getTownExact: function(town, county, state) {
    let db = new Database();
    const qs = 'SELECT * FROM cities WHERE name = ? AND county = ? AND state = ?';

    return db.query(qs, [town, county, state])
      .then((result) => {
        return JSON.stringify(result);
      });
  },

  getTownsInCounty: function(county, state) {
    let db = new Database();
    const qs = 'SELECT * FROM cities WHERE county = ? AND state = ?';

    return db.query(qs, [county, state])
      .then((result) => {
        return JSON.stringify(result);
      });
  },

  getTownsInState: function(state) {
    let db = new Database();
    const qs = 'SELECT * FROM cities WHERE state = ?';

    return db.query(qs, [state])
      .then((result) => {
        return JSON.stringify(result);
      });
  }
};
