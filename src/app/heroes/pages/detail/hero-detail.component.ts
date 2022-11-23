import {Component, OnInit} from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public heroesService: HeroesService
  ) {
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params.id);
  }


}
