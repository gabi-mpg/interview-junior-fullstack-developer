import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from '../services/cities.service';

describe('CitiesController', () => {
  let controller: CitiesController;
  const citiesServiceMock = {
    getAllCities: jest.fn().mockReturnValue([]),
    searchCitiesByTerm: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        { provide: CitiesService, useValue: citiesServiceMock },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAllCities method of CitiesService', () => {
    const result = controller.getAllCities();
    expect(citiesServiceMock.getAllCities).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should call searchCitiesByTerm method of CitiesService', () => {
    const term = 'test';
    const result = controller.searchCities(term);
    expect(citiesServiceMock.searchCitiesByTerm).toHaveBeenCalledTimes(1);
    expect(citiesServiceMock.searchCitiesByTerm).toHaveBeenCalledWith(term);
    expect(result).toEqual([]);
  });
});
