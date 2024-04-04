import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dimensions } from './dimensions';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

constructor(private http: HttpClient) { }
private apiUrl = 'https://localhost:5001/svg';

getInitialDimensions(): Observable<Dimensions> {
  return this.http.get<Dimensions>(this.apiUrl);
}

saveDimensions(dimensions: any): Observable<any> {
  return this.http.post('https://localhost:5001/svg', dimensions);
}
}
