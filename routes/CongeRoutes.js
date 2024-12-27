const express = require('express');
const CongeRouter = express.Router();

const CongeController = require('../controller/CongeController');

CongeRouter.post('/add', CongeController.createC);


CongeRouter.get('/listr',  CongeController.getAllConge);

CongeRouter.get('/list/:id',CongeController.getConge);


CongeRouter.put('/updateC/:id', CongeController.updateCongeStatus);


CongeRouter.delete('/deleteC/:id',  CongeController.deleteConge);

module.exports = CongeRouter;
