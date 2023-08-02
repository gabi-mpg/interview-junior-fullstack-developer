import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CitiesService {
  private readonly dataFileName = 'cities.json';
  private cities: any[];

  constructor() {
    this.loadCities();
  }

  private loadCities(): void {
    const dataFilePath = path.join(__dirname, '..', '../../../', this.dataFileName);
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    this.cities = JSON.parse(rawData);
  }

  getAllCities(): any[] {
    return this.cities;
  }

  searchCitiesByTerm(term: string): any[] {
    term = term.toLowerCase();
    return this.cities.filter((city) =>
      city.cityName.toLowerCase().includes(term)
    );
  }
}



