const Database = require('../config/db');

module.exports = {
  getTown: function(town, county, state) {
    let db = new Database();
    let qs = `SELECT *, median_income / (cost_of_living / 100) AS adj_income FROM cities WHERE`;
    let args = [];

    if (town) {
      qs += ` name = ?`;
      args.push(town);
    }

    if (county) {
      if (town)
        qs += ` AND county = ?`;
      else
        qs += ` county = ?`;

      args.push(county);
    }

    if (state) {
      if (town || county)
        qs += ` AND state = ?`;
      else
        qs += ` state = ?`;

      args.push(state);
    }

    return db.query(qs, args)
      .then((result) => {
        if (result == undefined || result.length === 0)
          return Promise.reject('UserError: No results found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getCounty: function(county, state) {
    let db = new Database();
    let qs = `SELECT county, state, COUNT(*) AS num_towns, SUM(population) AS sum_population,
        AVG(median_income) AS avg_income, AVG(cost_of_living) AS avg_cost_of_living,
        AVG(median_income / (cost_of_living / 100)) AS avg_adj_income
        FROM cities WHERE`;
    let args = [];

    if (county) {
      qs += ` county = ? GROUP BY state ORDER BY state`;
      args.push(county);
    }

    if (state) {
      qs += ` state = ? GROUP BY county ORDER BY county`;
      args.push(state);
    }

    return db.query(qs, args)
      .then((result) => {
        if (result == undefined || result.length === 0)
          return Promise.reject('UserError: No results found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getTownExact: function(town, county, state) {
    let db = new Database();
    const qs = `SELECT *, median_income / (cost_of_living / 100) AS adj_income
        FROM cities WHERE name = ? AND county = ? AND state = ?`;

    return db.query(qs, [town, county, state])
      .then((result) => {
        if (result == undefined || result.length === 0)
          return Promise.reject('UserError: Town not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getCountyExact: function(county, state) {
    let db = new Database();
    const qs = `SELECT county, state, COUNT(*) AS num_towns, SUM(population) AS sum_population,
        AVG(median_income) AS avg_income, AVG(cost_of_living) AS avg_cost_of_living,
        AVG(median_income / (cost_of_living / 100)) AS avg_adj_income
        FROM cities WHERE county = ? AND state = ?`;

    return db.query(qs, [county, state])
      .then((result) => {
        if (result == undefined || result.length === 0 || result[0].county === null)
          return Promise.reject('UserError: County not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getStateExact: function(state) {
    let db = new Database();
    const qs = `SELECT state, COUNT(*) AS num_towns, COUNT(DISTINCT county) AS num_counties,
        SUM(population) AS sum_population, AVG(median_income) AS avg_income,
        AVG(cost_of_living) AS avg_cost_of_living, AVG(median_income / (cost_of_living / 100))
        AS avg_adj_income FROM cities WHERE state = ?`;

    return db.query(qs, [state])
      .then((result) => {
        if (result == undefined || result.length === 0 || result[0].state === null)
          return Promise.reject('UserError: State not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  }
};
