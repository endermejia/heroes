import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Heroe} from '../models/heroes.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  public heroesData: Heroe[] = [];
  public showSpinner: boolean = false;

  constructor(private http: HttpClient) {
    this.getMockHeroes().subscribe((data: any) => {
      this.heroesData = data.data;
    });
  }

  public getMockHeroes(): Observable<Object> {
    return this.http.get(`assets/heroes-data.json`);
  }

  public getHeroes(filter: string): Observable<Heroe[]> {
    this.showSpinner = true;
    return new Observable<Heroe[]>((observer) => {
      setTimeout(() => {
        observer.next(
          filter?.length > 0
            ? this.heroesData.filter((item: Heroe) => // No sólo filtra por nombre ;)
              Object.values(item).some((value: string) => value.toLowerCase().includes(filter.toLowerCase()))
            )
            : this.heroesData
        );
        this.showSpinner = false;
      }, 1000);
    });
  }

  public getHeroe(id: string): Observable<Heroe> {
    this.showSpinner = true;
    return new Observable<Heroe>((observer) => {
      setTimeout(() => {
        observer.next(this.heroesData.find((item: Heroe) => item.id === id));
        this.showSpinner = false;
      }, 1000);
    });
  }

  public deleteHeroe(id: string): Observable<Heroe> {
    this.showSpinner = true;
    return new Observable<Heroe>((observer) => {
      setTimeout(() => {
        this.heroesData = this.heroesData.filter((item: Heroe) => item.id !== id);
        observer.next();
        this.showSpinner = false;
      }, 1000);
    });
  }

  public updateHeroe(heroe: Heroe): Observable<Heroe> {
    this.showSpinner = true;
    return new Observable<Heroe>((observer) => {
      setTimeout(() => {
        this.heroesData = this.heroesData.map((item: Heroe) => item.id === heroe.id ? heroe : item);
        observer.next();
        this.showSpinner = false;
      }, 1000);
    });
  }

  public addHeroe(heroe: Heroe): Observable<Heroe> {
    this.showSpinner = true;
    return new Observable<Heroe>((observer) => {
      setTimeout(() => {
        let id = this.heroesData.length + 1;
        while (this.heroesData.find((item: Heroe) => item.id === id.toString())) {
          id++;
        }
        heroe.id = id.toString();
        this.heroesData.push(heroe);
        observer.next();
        this.showSpinner = false;
      }, 1000);
    });
  }

}
