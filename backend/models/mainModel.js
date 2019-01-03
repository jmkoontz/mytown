const Database = require('../config/db');

module.exports = {
  getTown: function(town) {
    let db = new Database();
    const qs = `SELECT * FROM cities WHERE name = ?`;

    return db.query(qs, [town])
      .then((result) => {
        if (result === undefined || result.length === 0)
          return Promise.reject('UserError: No results found');

        let towns = [];
        for (let row in result) {
          towns.push(JSON.stringify(result[row]))
        }

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getTownExact: function(town, county, state) {
    let db = new Database();
    const qs = `SELECT *, median_income / (cost_of_living / 100)
        FROM cities WHERE name = ? AND county = ? AND state = ?`;

    return db.query(qs, [town, county, state])
      .then((result) => {
        if (result === undefined || result.length === 0)
          return Promise.reject('UserError: Town not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getTownsInCounty: function(county, state) {
    let db = new Database();
    const qs = `SELECT * FROM cities WHERE county = ? AND state = ?`;

    return db.query(qs, [county, state])
      .then((result) => {
        if (result === undefined || result.length === 0)
          return Promise.reject('UserError: County not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getTownsInState: function(state) {
    let db = new Database();
    const qs = `SELECT * FROM cities WHERE state = ?`;

    return db.query(qs, [state])
      .then((result) => {
        if (result === undefined || result.length === 0)
          return Promise.reject('UserError: State not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getCountyExact: function(county, state) {
    let db = new Database();
    const qs = `SELECT county, state, count(*), sum(population),
        avg(median_income), avg(cost_of_living),
        avg(median_income / (cost_of_living / 100))
        FROM cities WHERE county = ? AND state = ?`;

    return db.query(qs, [county, state])
      .then((result) => {
        if (result === undefined || result.length === 0)
          return Promise.reject('UserError: County not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getState: function(state) {
    let db = new Database();
    const qs = `SELECT state, count(*), sum(population),
        avg(median_income), avg(cost_of_living),
        avg(median_income / (cost_of_living / 100))
        FROM cities WHERE state = ?`;

    return db.query(qs, [state])
      .then((result) => {
        if (result === undefined || result.length === 0)
          return Promise.reject('UserError: State not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  }
};
