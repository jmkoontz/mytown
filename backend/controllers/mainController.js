const bodyParser = require('body-parser');

const controllerUtils = require('./controllerUtils');
const mainModel = require('../models/mainModel');

module.exports = (app) => {
  app.get('/MyTown/Towns', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTown(req.query.town);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Town/:town/:county/:state', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTownExact(req.params.town, req.params.county, req.params.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/County/:county/:state', async (req, res) => {
    let data;
    try {
      data = await mainModel.getCountyExact(req.params.county, req.params.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/State/:state', async (req, res) => {
    let data;
    try {
      data = await mainModel.getState(req.params.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Towns/County', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTownsInCounty(req.query.county, req.query.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Towns/State', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTownsInState(req.query.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  /*
  select * from cities where median_income >= 200000;
  select * from cities where population > 100000 and median_income > 100000;
  select count(*) from cities where population > 1000;
  select sum(population), avg(median_income), avg(cost_of_living), avg(crime_index) from cities;
  select name, state, population, median_income, cost_of_living, (median_income / (cost_of_living / 100)) from cities;
  select state, sum(population), avg(median_income), avg(cost_of_living), (avg(median_income) / avg(cost_of_living / 100)) from cities group by state;
  select state, sum(population), avg(population), count(*), sum(land_area), avg(crime_index) from cities group by state order by sum(population) desc;
  select county, state, sum(population), avg(median_income), avg(cost_of_living) from cities group by county;
  select state, max(median_income), min(median_income), avg(median_income), max(population), min(population), avg(population) from cities group by state;
  */
};
