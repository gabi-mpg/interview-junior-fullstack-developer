// cities.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly citiesService: CityService) {}

  @Get()
  findAllCities() {
    return this.citiesService.findAllCities();
  }

  @Get('search') 
  searchCities(@Query('term') term: string) {
    return this.citiesService.findAllCities().filter(city => city.name.includes(term));
  }
}


