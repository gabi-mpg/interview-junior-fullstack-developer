import { Component } from '@angular/core';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  searchTerm!: string;

  onSubmit() {
    // You can implement the logic here to handle the form submission
    // For now, we'll just log the search term to the console
    console.log('Search term:', this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = ''; // Clear the search term when the clear button is clicked
  }
}


