import { Component } from '@angular/core';
import { CitySearchService } from '../../services/city-search.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  searchTerm!: string;

  constructor(private citySearchService: CitySearchService) {}

  onSubmit() {
    this.citySearchService.searchCities(this.searchTerm).subscribe({
      next: (cities) => {
        console.log(cities);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
