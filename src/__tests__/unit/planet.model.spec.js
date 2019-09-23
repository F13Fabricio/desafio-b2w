const factory = require('../factories');

describe('Planet' , () => {
  describe('validations', () => {
    it('should be invalid if name is undefined', async () => {
      let planet = await factory.build('ValidPlanet', { name: undefined });
      planet.validateSync();
      
      expect(planet.errors.name.properties.type).toBe('required');
    });
  
    it('should be invalid if climate is undefined', async () => {
      let planet = await factory.build('ValidPlanet', { climate: undefined });
      planet.validateSync();
      
      expect(planet.errors.climate.properties.type).toBe('required');
    });
  
    it('should be invalid if terrain is undefined', async () => {
      let planet = await factory.build('ValidPlanet', { terrain: undefined });
      planet.validateSync();
      
      expect(planet.errors.terrain.properties.type).toBe('required');
    });
  
    it('should be invalid if times_spotted is undefined', async () => {
      let planet = await factory.build('ValidPlanet', { times_spotted: undefined });
      planet.validateSync();
      
      expect(planet.errors.times_spotted.properties.type).toBe('required');
    });
  
    it('should be invalid if name is longer than 50 characters', async () => {
      let planet = await factory.build('ValidPlanet', { name: 'a'.repeat(51)});
      planet.validateSync();
      
      expect(planet.errors.name.properties.type).toBe('maxlength');
    });
  
    it('should be invalid if times_spotted is negative', async () => {
      let planet = await factory.build('ValidPlanet', { times_spotted: -1 });
      planet.validateSync();
      
      expect(planet.errors.times_spotted.properties.type).toBe('min')
    });
  });
})

