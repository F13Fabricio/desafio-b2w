const mongoose = require('mongoose');
require('../models/planet.model');
const Planet = mongoose.model('Planet');
const { timesSpotted } = require('../services/planets.service');

class PlanetsController {
  
  async index(req, res, next) {
    try {
      const planets = await Planet.find({});

      res.status(200).send({ planets });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let planet = new Planet(req.body);
      planet.times_spotted = await timesSpotted(req.body.name);
      await planet.validate(async (err) => {
        if (err) {
          res.status(400);
          next(err);
        } else {
          await planet.save();
          res.status(201).send(planet);
        }
      });

    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const planet = await Planet.findById(req.params.id);
      if (planet) {
        res.status(200).send(planet);
      } else {
        res.status(404);
        next(new Error('The planet does not exists.'));
      }

    } catch (error) {
      if (error.name == 'CastError') {
        res.status(404);
        next(new Error('The planet does not exists.'));
      }
      next(error);
    }
  }

  async getByname(req, res, next) {
    try {
      const planet = await Planet.findOne({ name: req.params.name });
      if (planet) {
        res.status(200).send(planet);
      } else {
        res.status(404);
        next(new Error('The planet does not exists.'));
      }

    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      if (await Planet.findByIdAndRemove(req.params.id)) {
        res.status(200).send({ message: 'Planet successfully deleted.' });
      } else {
        res.status(404);
        next(new Error('The planet does not exists.'));
      }

    } catch (error) {
      if (error.name == 'CastError') {
        res.status(404);
        next(new Error('The planet does not exists.'));
      }
      next(error);
    }
  }
}

module.exports = new PlanetsController();