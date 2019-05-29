const bodyParser = require('body-parser');

const controllerUtils = require('./controllerUtils');
const mainModel = require('../models/mainModel');
const rankModel = require('../models/rankModel');
const leaderboardModel = require('../models/leaderboardModel');

module.exports = (app) => {
  app.get('/MyTown/Towns', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTown(req.query.town, req.query.county, req.query.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Counties', async (req, res) => {
    let data;
    try {
      data = await mainModel.getCounty(req.query.county, req.query.state);
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
      data = await mainModel.getStateExact(req.params.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Rank/Town/:town/:county/:state/:type', async (req, res) => {
    let data;
    try {
      data = await rankModel.getTownRanks(req.params.town, req.params.county, req.params.state, req.params.type);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Rank/County/:county/:state/:type', async (req, res) => {
    let data;
    try {
      data = await rankModel.getCountyRanks(req.params.county, req.params.state, req.params.type);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Rank/State/:state', async (req, res) => {
    let data;
    try {
      data = await rankModel.getStateRanks(req.params.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/Leaderboards/', async (req, res) => {
    let data;
    try {
      data = await leaderboardModel.getLeaderboard(req.query.mode, req.query.category,
          req.query.direction, parseInt(req.query.quantity), req.query.scope, req.query.state);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });
};
