import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  searchCities(term: string): Observable<any[]> {
    const url = `${this.backendUrl}/cities/search?term=${term}`;
    return this.http.get<any[]>(url);
  }
}
