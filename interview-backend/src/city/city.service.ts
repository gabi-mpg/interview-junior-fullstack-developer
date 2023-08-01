import { Injectable } from '@nestjs/common';
import { readJson } from 'fs-extra';
import * as path from 'path';

@Injectable()
export class CityService {
  private cities: any[] = [];

  constructor() {
    this.loadCities();
  }

  private async loadCities() {
    try {
      const filePath = path.join(__dirname, '..', '../../cities.json');
      console.log(filePath)
      this.cities = await readJson(filePath);
    } catch (error) {
      console.error('Error reading cities data:', error);
    }
  }

  findAllCities() {
    return this.cities;
  }
}


