import { Component, Input } from '@angular/core';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  @Input() cities: City[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void {
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
