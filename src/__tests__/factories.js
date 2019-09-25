const { factory } = require('factory-girl');
const mongoose = require('mongoose');

require('../models/planet.model');
const Planet = mongoose.model('Planet');

factory.define('ValidPlanet', Planet, {
  name: 'planet name',
  climate: 'climate',
  terrain: 'terrain',
  times_spotted: 0
});

module.exports = factory;