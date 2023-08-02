import { TestingModule } from '../../app.module.spec';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitySearchComponent } from './city-search.component';
import { CitySearchService } from '../../services/city-search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { City } from 'src/app/models/city.model';

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;
  let mockCitySearchService: jasmine.SpyObj<CitySearchService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockCitySearchService = jasmine.createSpyObj('CitySearchService', ['searchCities']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [CitySearchComponent],
      providers: [
        { provide: CitySearchService, useValue: mockCitySearchService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    });

    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a snackbar message when submitting with an empty search term', () => {
    component.onSubmit();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Please enter at least one letters before submitting.',
      'Close',
      { duration: 3000 }
    );
    expect(mockCitySearchService.searchCities).not.toHaveBeenCalled();
  });

  it('should trigger form submission and display cities when submitting with a valid search term', () => {
    const mockCities: City[] = [
      { cityName: 'City 1', count: 100 },
      { cityName: 'City 2', count: 50 }
    ];
    mockCitySearchService.searchCities.and.returnValue(of(mockCities));

    component.searchTerm = 'city';
    component.onSubmit();
    fixture.detectChanges(); 

    const appCityList = fixture.nativeElement.querySelector('app-city-list');
    expect(appCityList).toBeTruthy();
  });

  it('should fetch and display cities when submitting with a valid search term', () => {
    const mockCities: City[] = [
      { cityName: 'City 1', count: 100 },
      { cityName: 'City 2', count: 50 }
    ];
    mockCitySearchService.searchCities.and.returnValue(of(mockCities));
  
    component.searchTerm = 'test';
  
    component.onSubmit();
  
    expect(mockCitySearchService.searchCities).toHaveBeenCalledWith('test');
    expect(component.cities).toEqual(mockCities);
    expect(component.isFormSubmitted).toBeTrue();
  });;
});