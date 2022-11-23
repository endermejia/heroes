import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    component.heroesService.heroesData = [
      {
        id: '1',
        name: 'Batman',
        publisher: 'DC Comics',
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveHero should update a hero', waitForAsync(() => {
    const hero = {
      id: '1',
      name: 'Batmaaan',
      publisher: 'DC Comics',
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
    };
    component.heroeForm.patchValue(hero);
    component.saveHero();
    setTimeout(() => {
      expect(component.heroesService.heroesData.length).toEqual(1);
    }, 2000);
  }));

  it('saveHero should create a hero', waitForAsync(() => {
    const hero = {
      id: '',
      name: 'Superman',
      publisher: 'DC Comics',
      alter_ego: 'Clark Kent',
      first_appearance: 'Action Comics #1',
    };
    component.heroeForm.patchValue(hero);
    component.saveHero();
    setTimeout(() => {
      expect(component.heroesService.heroesData.length).toEqual(2);
    }, 2000);
  }));

});
