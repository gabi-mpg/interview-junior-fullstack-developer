import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityListComponent } from './city-list.component';
import { City } from '../../models/city.model';

describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display paginated cities correctly', () => {
    
    const mockCities: City[] = [
      { cityName: 'City 1', count: 100 },
      { cityName: 'City 2', count: 50 },
      { cityName: 'City 3', count: 75 },
      { cityName: 'City 4', count: 120 },
      { cityName: 'City 5', count: 90 }
    ];
    component.cities = mockCities;
    component.currentPage = 1;
    component.itemsPerPage = 2;
    fixture.detectChanges();
    const cityListElement: HTMLElement = fixture.nativeElement.querySelector('.city-list');
    
    fixture.detectChanges();

    const displayedCities = cityListElement.querySelectorAll('.city-item');
    expect(displayedCities.length).toBe(2); 
    expect(displayedCities[0].textContent).toContain('City 1');
    expect(displayedCities[1].textContent).toContain('City 2');

    
    component.changePage(2);
    fixture.detectChanges();

    
    const displayedCitiesPage2 = cityListElement.querySelectorAll('.city-item');
    expect(displayedCitiesPage2.length).toBe(2); 
    expect(displayedCitiesPage2[0].textContent).toContain('City 3');
    expect(displayedCitiesPage2[1].textContent).toContain('City 4');
  });

  it('should update currentPage when changePage is called', () => {
    
    component.currentPage = 1;

    
    component.changePage(3);

    
    expect(component.currentPage).toBe(3);
  });
});

