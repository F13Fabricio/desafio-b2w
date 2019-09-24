const { Router } = require('express');
const planetsController = require('./controllers/planets.controller');

const routes = Router();

routes.get('/planets', planetsController.index);
routes.post('/planets', planetsController.create);
routes.get('/planets/:id', planetsController.show);
routes.delete('/planets/:id', planetsController.delete);
routes.get('/planets/name/:name', planetsController.getByname);

module.exports = routes;
