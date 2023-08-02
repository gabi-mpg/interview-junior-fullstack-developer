import { CitiesService } from './cities.service';
import * as fs from 'fs';
import * as path from 'path';

describe('CitiesService', () => {
  let service: CitiesService;
  const citiesMock = [
    { cityName: 'City 1', count: 100 },
    { cityName: 'City 2', count: 50 },
    { cityName: 'City 3', count: 75 },
  ];

  beforeEach(() => {
    service = new CitiesService();
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(citiesMock));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load cities from file', () => {
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(__dirname, '..', '../../../', 'cities.json'),
      'utf8'
    );
    expect(service['cities']).toEqual(citiesMock);
  });

  it('should return all cities', () => {
    const result = service.getAllCities();
    expect(result).toEqual(citiesMock);
  });

  it('should search cities by term', () => {
    const term = 'city 1';
    const expectedCities = [{ cityName: 'City 1', count: 100 }];

    const result = service.searchCitiesByTerm(term);
    expect(result).toEqual(expectedCities);
  });
});
