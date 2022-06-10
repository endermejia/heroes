import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NobelService {

  constructor(private http: HttpClient) {
  }

  public getNobelPrizeByCategoryAndYear(category: string, year: string, yearTo: string): Observable<Object> {
    return this.http.get(`https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeCategory=${category}&nobelPrizeYear=${year}&yearTo=${yearTo}`);
  }

}
