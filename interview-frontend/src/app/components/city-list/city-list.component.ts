import { Component, Input } from '@angular/core';
import { City } from '../../models/city.model'; // Asegúrate de importar el modelo de ciudad adecuado.

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  @Input() cities!: City[]; // cities será un arreglo de objetos City, asegúrate de definir el modelo City adecuado.
}

