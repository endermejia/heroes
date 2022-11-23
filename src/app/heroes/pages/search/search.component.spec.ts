import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.heroesService.heroesData = [
      {
        id: '1',
        name: 'Batman',
        publisher: 'DC Comics',
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
      }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteHero', waitForAsync(() => {
    expect(component.heroesService.heroesData.length).toEqual(1);
    component.deleteHero('1');
    setTimeout(() => {
      expect(component.heroesService.heroesData.length).toEqual(0);
    }, 2000);
  }));

  it('search OK', waitForAsync(() => {
    component.searchForm.controls['filter'].setValue('batman');
    component.search();
    setTimeout(() => {
      expect(component.heroes.data.length).toEqual(1);
    }, 2000);
  }));

  it('search KO', waitForAsync(() => {
    component.searchForm.controls['filter'].setValue('superman');
    component.search();
    setTimeout(() => {
      expect(component.heroes.data.length).toEqual(0);
    }, 2000);
  }));


});
