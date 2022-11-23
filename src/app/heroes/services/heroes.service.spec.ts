import {TestBed, waitForAsync} from '@angular/core/testing';
import {HeroesService} from './heroes.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroesService);
    service.heroesData = [
      {
        id: '1',
        name: 'Batman',
        publisher: 'DC Comics',
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('heroesData should be an array of Hero', () => {
    expect(service.heroesData.length > 0).toBeTruthy();
    expect(service.heroesData[0].id).toBeTruthy();
    expect(service.heroesData[0].name).toBeTruthy();
    expect(service.heroesData[0].publisher).toBeTruthy();
    expect(service.heroesData[0].alter_ego).toBeTruthy();
    expect(service.heroesData[0].first_appearance).toBeTruthy();
  });

  it('getHeroes filter OK', waitForAsync(() => {
    service.getHeroes('batman').subscribe((res) => {
      expect(res.length).toEqual(1);
    });
  }));

  it('getHeroes filter KO', waitForAsync(() => {
    service.getHeroes('superman').subscribe((res) => {
      expect(res.length).toEqual(0);
    });
  }));


  it('updateHeroe should update a hero', waitForAsync(() => {
    const hero = {
      id: '1',
      name: 'Batmaaan',
      publisher: 'DC Comics',
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
    };
    service.updateHeroe(hero).subscribe((response) => {
      expect(service.heroesData[0]).toBe(hero);
    });
  }));

  it('deleteHeroe should delete a hero', waitForAsync(() => {
    service.deleteHeroe('1').subscribe((response) => {
      expect(service.heroesData.length).toBe(0);
    });
  }));

  it('addHeroe should add a hero', waitForAsync(() => {
    const hero = {
      id: '2',
      name: 'Batmaaan',
      publisher: 'DC Comics',
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
    };
    service.addHeroe(hero).subscribe((response) => {
      expect(service.heroesData.length).toBe(2);
    });
  }));


});
