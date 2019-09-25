const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler.middleware');

class App {
  constructor() {
    this.express = express();
    this.preMiddlewares();
    this.routes();
    this.postMiddlewares();
  }

  preMiddlewares() {
    this.express.use(express.json());
  }

  postMiddlewares() {
    this.express.use(errorHandler);
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;