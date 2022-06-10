import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NobelPrizesDataModel} from '../models/nobel.model';

@Injectable({
  providedIn: 'root'
})
export class NobelService {

  public nobelPrizesData: NobelPrizesDataModel | null = null;
  public showSpinner: boolean = false;

  constructor(private http: HttpClient) {
  }

  public searchNobelPrizesByCategoryAndYears(category: string, year: string, yearTo: string): void {
    this.getNobelPrizesByCategoryAndYears(category, year, yearTo)
      .subscribe(
        (data: Object) => {
          this.nobelPrizesData = data as NobelPrizesDataModel;
          // TODO: Delete. Timeout for show spinner.
          setTimeout(() => {
            this.showSpinner = false;
          }, 1000);
        }
      );
  }

  public getNobelPrizesByCategoryAndYears(category: string, year: string, yearTo: string): Observable<Object> {
    return this.http.get(`https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeCategory=${category}&nobelPrizeYear=${year}&yearTo=${yearTo}`);
  }

  public getNobelPrizesByCategoryAndYear(category: string, year: string): Observable<Object> {
    return this.http.get(`https://api.nobelprize.org/2.1/nobelPrize/${category}/${year}`);
  }

}
