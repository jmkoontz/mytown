const Database = require('../config/db');

module.exports = {
  getLeaderboard: function(mode, category, direction, quantity, scope, state) {
    let db = new Database();
    let qs = '';
    let args = [];

    if (mode === 'town') {
      qs += `SELECT *, median_income / (cost_of_living / 100) AS adj_income FROM cities`;
    } else if (mode === 'county') {
      qs += `SELECT county, state, COUNT(*) AS num_towns, SUM(population) AS sum_population,
          AVG(median_income) AS avg_income, AVG(cost_of_living) AS avg_cost_of_living,
          AVG(median_income / (cost_of_living / 100)) AS avg_adj_income
          FROM cities`;
    } else if (mode === 'state') {
      qs += `SELECT state, COUNT(*) AS num_towns, COUNT(DISTINCT county) AS num_counties,
          SUM(population) AS sum_population, AVG(median_income) AS avg_income,
          AVG(cost_of_living) AS avg_cost_of_living, AVG(median_income / (cost_of_living / 100))
          AS avg_adj_income FROM cities GROUP BY state`;
    }

    if (scope === 'state') {
      qs += ` WHERE state = ?`;
      args.push(state);
    }

    if (mode === 'county')
      qs += ` GROUP BY county, state`;

    qs += ` ORDER BY ` + category; // pushing as arg doesn't work?

    if (direction === 'top')
      qs += ` DESC `;
    else if (direction === 'bottom')
      qs += ` ASC `;

    qs += `LIMIT ?`;
    args.push(quantity);

    return db.query(qs, args)
      .then((result) => {
        if (result == undefined || result.length === 0)
          return Promise.reject('UserError: No results found');

        return JSON.stringify(result);
      }).catch((err) => {
        return Promise.reject(err);
      });
  }
};
