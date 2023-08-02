import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CitySearchService } from './city-search.service';
import { City } from '../models/city.model'

describe('CitySearchService', () => {
  let service: CitySearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitySearchService]
    });

    service = TestBed.inject(CitySearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cities when calling searchCities', () => {
    // Arrange
    const mockCities: City[] = [
      { cityName: 'City 1', count: 100 },
      { cityName: 'City 2', count: 50 }
    ];
    const searchTerm = 'test';

    // Act
    service.searchCities(searchTerm).subscribe({
      next: (cities) => {
        // Assert
        expect(cities).toEqual(mockCities);
      }
    });

    // Mock the HTTP request
    const req = httpMock.expectOne(`${service['backendUrl']}/cities/search/${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  });

  it('should handle errors when calling searchCities', () => {
    // Arrange
    const searchTerm = 'error';

    // Act
    service.searchCities(searchTerm).subscribe({
      error: (error) => {
        // Assert
        expect(error).toBeTruthy();
      }
    });

    // Mock the HTTP request with an error response
    const req = httpMock.expectOne(`${service['backendUrl']}/cities/search/${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('404 Not Found'));
  });
});
