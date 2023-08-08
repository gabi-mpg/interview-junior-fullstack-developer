import { Component, Input, SimpleChanges } from '@angular/core';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  @Input() cities: City[] = [];
  @Input() isFormSubmitted: boolean = true;
  @Input() term: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities'] && !changes['cities'].firstChange) {
      this.currentPage = 1;
    }
    
    if (!this.cities || this.cities.length === 0) {
      this.cities = [];
    }
  }
  
  get paginatedCities(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.cities.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
