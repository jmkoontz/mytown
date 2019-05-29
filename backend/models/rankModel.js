const Database = require('../config/db');

module.exports = {
  getTownRanks: function(town, county, state, type) {
    let db = new Database();
    let args = [];

    const popRank = `RANK() OVER(ORDER BY population DESC)`;
    const incRank = `RANK() OVER(ORDER BY median_income DESC)`;
    const adjIncRank = `RANK() OVER(ORDER BY median_income / (cost_of_living / 100) DESC)`;
    const colRank = `RANK() OVER(ORDER BY cost_of_living DESC)`;

    let qs = `SELECT * FROM (SELECT name, county, state, ` + popRank + ` AS popRank, `
        + incRank + ` AS incRank, ` + adjIncRank + ` AS adjIncRank, ` + colRank + ` AS colRank
        FROM cities`;

    if (type == 'county') {
      qs += ` WHERE county = ? AND state = ?)`;
      args.push(county, state);
    } else if (type == 'state') {
      qs += ` WHERE state = ?)`;
      args.push(state);
    } else if (type == 'overall') {
      qs += `)`;
    }

    qs += ` sub WHERE name = ? AND county = ? AND state = ?`;
    args.push(town, county, state);

    return db.query(qs, args)
      .then((result) => {
        if (result == undefined || result.length === 0)
          return Promise.reject('UserError: Town not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getCountyRanks: function(county, state, type) {
    let db = new Database();
    let args = [];

    const countRank = `RANK() OVER(ORDER BY COUNT(*) DESC)`;
    const popRank = `RANK() OVER(ORDER BY SUM(population) DESC)`;
    const incRank = `RANK() OVER(ORDER BY AVG(median_income) DESC)`;
    const adjIncRank = `RANK() OVER(ORDER BY AVG(median_income / (cost_of_living / 100)) DESC)`;
    const colRank = `RANK() OVER(ORDER BY AVG(cost_of_living) DESC)`;

    let qs = `SELECT * FROM (SELECT county, state, ` + countRank + `AS countRank, `
        + popRank + ` AS popRank, ` + incRank + ` AS incRank, ` + adjIncRank +
        ` AS adjIncRank, ` + colRank + ` AS colRank FROM cities`;

    if (type == 'state') {
      qs += ` WHERE state = ?`;
      args.push(state);
    }

    qs += ` GROUP BY county, state) sub WHERE county = ? AND state = ?`;
    args.push(county, state);

    return db.query(qs, args)
      .then((result) => {
        if (result == undefined || result.length === 0)
          return Promise.reject('UserError: County not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  },

  getStateRanks: function(state) {
    let db = new Database();

    const townCountRank = `RANK() OVER(ORDER BY COUNT(*) DESC)`;
    const countyCountRank = `RANK() OVER(ORDER BY COUNT(DISTINCT county) DESC)`;
    const popRank = `RANK() OVER(ORDER BY SUM(population) DESC)`;
    const incRank = `RANK() OVER(ORDER BY AVG(median_income) DESC)`;
    const adjIncRank = `RANK() OVER(ORDER BY AVG(median_income / (cost_of_living / 100)) DESC)`;
    const colRank = `RANK() OVER(ORDER BY AVG(cost_of_living) DESC)`;

    let qs = `SELECT * FROM (SELECT state, ` + townCountRank + `AS townCountRank, `
        + countyCountRank + `AS countyCountRank, ` + popRank + ` AS popRank, `
        + incRank + ` AS incRank, ` + adjIncRank + ` AS adjIncRank, ` + colRank +
        ` AS colRank FROM cities GROUP BY state) sub WHERE state = ?`;

    return db.query(qs, [state])
      .then((result) => {
        if (result == undefined || result.length === 0)
          return Promise.reject('UserError: County not found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  }
};
