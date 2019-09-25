const mockAxios = require('axios');
const { timesSpotted } = require('../../services/planets.service');

describe('timesSpotted', () => {
  describe('when planet not found', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { count: 0, results: [] }
      })
    );

    it('should return 0', async () => {
      const resp = await timesSpotted('planetName');
      expect(resp).toEqual(0);
    });
  });

  describe('when planet found', () => {
    const films = ['link1', 'link2', 'link2']
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          count: 1,
          results: [{ films }]
        }
      })
    );

    it('should return number of films', async () => {
      const resp = await timesSpotted('planetName');
      expect(resp).toEqual(films.length);
    });
  });
});
