const bodyParser = require('body-parser');

const controllerUtils = require('./controllerUtils');
const mainModel = require('../models/mainModel');

module.exports = (app) => {
  app.get('/MyTown/Town/:name', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTown(req.params.name);
      //console.log(data);
    } catch (err) {
      //console.log(err);
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/County/:name', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTown(req.params.name);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });

  app.get('/MyTown/State/:name', async (req, res) => {
    let data;
    try {
      data = await mainModel.getTown(req.params.name);
    } catch (err) {
      data = {error: controllerUtils.parseError(err)};
    }

    controllerUtils.buildResponse(res, data);
  });
};
