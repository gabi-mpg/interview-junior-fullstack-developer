import { Module } from '@nestjs/common';
import { CitiesController } from './city/controllers/cities.controller';
import { CitiesService } from './city/services/cities.service';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class AppModule {}



