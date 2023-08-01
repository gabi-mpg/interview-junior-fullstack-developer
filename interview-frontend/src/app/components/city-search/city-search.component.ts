import { Component } from '@angular/core';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  searchTerm!: string;

  onSubmit() {
    console.log('Search term:', this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
  }
}
