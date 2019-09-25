const axios = require('axios');

const baseUrl = 'https://swapi.co/api/';

async function timesSpotted(planetName) {
  const response = await axios.get(`${baseUrl}planets?search=${planetName}`);
  if (response.data.count == 0) {
    return 0;
  }
  const films = response.data.results[0].films;
  return films.length;
}

module.exports = {
  timesSpotted
}
