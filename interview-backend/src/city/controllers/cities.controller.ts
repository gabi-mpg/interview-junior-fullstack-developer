import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from '../services/cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getAllCities(): any[] {
    return this.citiesService.getAllCities();
  }

  @Get('search/:term')
  searchCities(@Param('term') term: string): any[] {
    return this.citiesService.searchCitiesByTerm(term);
  }
}



