import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NobelPrizeModel, NobelPrizesDataModel} from '../models/nobel.model';

@Injectable({
  providedIn: 'root'
})
export class NobelService {

  public nobelPrizesData: NobelPrizesDataModel | null = null;
  public nobelPrize: NobelPrizeModel[] = [];
  public showSpinner: boolean = false;

  constructor(private http: HttpClient) {
  }

  public getLaureatesNames(nobelPrize: NobelPrizeModel): string {
    return nobelPrize?.laureates?.length > 0
      ? nobelPrize.laureates.map(laureate => laureate.knownName?.en || laureate.orgName?.en).join(', ')
      : nobelPrize.topMotivation?.en.split('.')[0] || '-';
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

  public searchNobelPrizeByCategoryAndYear(category: string, year: string): void {
    this.getNobelPrizeByCategoryAndYear(category, year)
      .subscribe(
        (data: Object) => {
          this.nobelPrize = data as NobelPrizeModel[];
          this.showSpinner = false;
        }
      );
  }

  private getNobelPrizesByCategoryAndYears(category: string, year: string, yearTo: string): Observable<Object> {
    return this.http.get(`https://api.nobelprize.org/2.1/nobelPrizes?nobelPrizeCategory=${category}&nobelPrizeYear=${year}&yearTo=${yearTo}`);
  }

  private getNobelPrizeByCategoryAndYear(category: string, year: string): Observable<Object> {
    return this.http.get(`https://api.nobelprize.org/2.1/nobelPrize/${category}/${year}`);
  }

}
