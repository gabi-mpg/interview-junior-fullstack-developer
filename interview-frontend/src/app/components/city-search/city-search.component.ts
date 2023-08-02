import { Component } from '@angular/core';
import { CitySearchService } from '../../services/city-search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  searchTerm!: string;
  cities: City[] = [];
  isFormSubmitted = false;

  constructor(
    private citySearchService: CitySearchService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (!this.searchTerm || this.searchTerm.length < 1) {
      this.snackBar.open('Please enter at least one letters before submitting.', 'Close', {
        duration: 3000
      });
      return;
    }

    this.citySearchService.searchCities(this.searchTerm).subscribe({
      next: (cities) => {
        this.cities = cities;
        this.isFormSubmitted = true;
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

