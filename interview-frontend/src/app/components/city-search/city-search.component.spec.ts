import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CitySearchComponent } from './city-search.component';
import { CitySearchService } from '../../services/city-search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from 'src/app/models/city.model';

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;
  let citySearchService: jasmine.SpyObj<CitySearchService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const citySearchServiceSpy = jasmine.createSpyObj('CitySearchService', ['searchCities']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [CitySearchComponent],
      providers: [
        { provide: CitySearchService, useValue: citySearchServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    citySearchService = TestBed.inject(CitySearchService) as jasmine.SpyObj<CitySearchService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show a snackbar message when submitting with an empty search term', () => {
    component.searchTerm = '';
    component.onSubmit();
    expect(snackBar.open).toHaveBeenCalledWith('Please enter at least one letter before submitting.', 'Close', {
      duration: 3000
    });
  });

  it('should call citySearchService.searchCities and update cities when submitting with a non-empty search term', () => {
    const mockCities: City[] = [
      { cityName: 'City 1', count: 100 },
      { cityName: 'City 2', count: 50 }
    ];
    citySearchService.searchCities.and.returnValue(of(mockCities));
    component.searchTerm = 'test';
    component.onSubmit();
    expect(citySearchService.searchCities).toHaveBeenCalledWith('test');
    expect(component.cities).toEqual(mockCities);
    expect(component.isFormSubmitted).toBeTrue();
  });

  it('should clear the search term when calling clearSearch()', () => {
    component.searchTerm = 'test';
    component.clearSearch();
    expect(component.searchTerm).toBe('');
  });
});


