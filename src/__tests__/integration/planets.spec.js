const mongoose = require('mongoose');
const request = require('supertest');
const mockAxios = require('axios');
const factory = require('../factories');
const app = require('../../app');

mongoose.connect(
  'mongodb://localhost:27017/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const films = ['link1', 'link2', 'link2'];
const mockRespense = {
  data: {
    count: 1,
    results: [{ films }]
  }
}

beforeEach(async () => {
  await mongoose.connection.dropCollection('planets', (err) => {});
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve(mockRespense)
  );
});

afterAll(async () => {
  await mongoose.connection.dropCollection('planets', (err) => {});
  await mongoose.disconnect();
});

describe('GET /planets', () => {
  it('should return status code 200', async () => {
    const response = await request(app)
      .get("/planets");

    expect(response.status).toBe(200);
  });
});

describe('POST /planets', () => {
  describe('when the planet is valid', () => {
    const validPlanet = {
      name: 'name',
      climate: 'climate',
      terrain: 'terrain'
    }
    const response = () => {
      return request(app).post("/planets").send(validPlanet);
    }

    it('should return status code 201', async () => {
      expect((await response()).status).toBe(201);
    });

    it('should return the planet', async () => {
      expect((await response()).body).toMatchObject(validPlanet);
    });
  });

  describe('when the planet is invalid', () => {
    const response = () => {
      return request(app).post("/planets").send({ name: 'name' });
    }

    it('should return status code 400 - Bad Request', async () => {
      expect((await response()).status).toBe(400);
    });
  });
});

describe('GET /planets/:id', () => {
  describe('when planet exists', () => {
    it('should return status code 200', async () => {
      let planet = await factory.create('ValidPlanet');
      const response = await request(app)
        .get(`/planets/${planet.id}`);
  
      expect(response.status).toBe(200);
    });

    it('should return the planet', async () => {
      let planet = await factory.create('ValidPlanet');

      const response = await request(app)
        .get(`/planets/${planet.id}`);
  
      expect(response.body).toMatchObject({ '_id': planet.id });
    });
  });

  describe('when planet not exists', () => {
    it('should return status code 404', async () => {
      let planet = { id: '0000000'}
      const response = await request(app)
        .get(`/planets/${planet.id}`);
  
      expect(response.status).toBe(404);
    });
  });
});

describe('GET /planets/name/:name', () => {
  describe('when planet exists', () => {
    it('should return status code 200', async () => {
      let planet = await factory.create('ValidPlanet');
      const response = await request(app)
        .get(`/planets/name/${planet.name}`);
  
      expect(response.status).toBe(200);
    });

    it('should return the planet', async () => {
      let planet = await factory.create('ValidPlanet');

      const response = await request(app)
        .get(`/planets/name/${planet.name}`);
  
      expect(response.body).toMatchObject({ '_id': planet.id });
    });
  });

  describe('when planet not exists', () => {
    it('should return status code 404', async () => {
      let invalidName = 'invalid name';
      const response = await request(app)
        .get(`/planets/name/${invalidName}`);
  
      expect(response.status).toBe(404);
    });
  });
});

describe('DELETE /planets/:id', () => {
  describe('when planet exists', () => {
    it('should return status code 200', async () => {
      let planet = await factory.create('ValidPlanet');
      const response = await request(app)
        .delete(`/planets/${planet.id}`);
  
      expect(response.status).toBe(200);
    });
  });

  describe('when planet not exists', () => {
    it('should return status code 404', async () => {
      const response = await request(app)
        .delete('/planets/000000000');
  
      expect(response.status).toBe(404);
    });
  });
});
