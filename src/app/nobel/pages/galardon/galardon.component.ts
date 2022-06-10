import {Component, OnInit} from '@angular/core';
import {NobelService} from '../../services/nobel.service';
import {NobelPrizeModel} from '../../models/nobel.model';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-galardon',
  templateUrl: './galardon.component.html',
  styleUrls: ['./galardon.component.scss']
})
export class GalardonComponent implements OnInit {

  public nobelPrize: NobelPrizeModel = {} as NobelPrizeModel;

  // Los ids de las categorías: ['che', 'eco', 'lit', 'pea', 'phy', 'med'].
  public categories: any = {
    Chemistry: 'che',
    Economy: 'eco',
    Literature: 'lit',
    Peace: 'pea',
    Physics: 'phy',
    Medicine: 'med'
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public nobelService: NobelService
  ) {
  }

  ngOnInit(): void {
    this.getNobelPrize();
  }

  getAwardYear(): string {
    return this.activatedRoute.snapshot.paramMap.get('awardYear')?.split('-').pop() || '';
  }

  getCategory(): string {
    const category = this.activatedRoute.snapshot.paramMap.get('awardYear')?.split('-').shift() || '';
    return this.categories[category];
  }

  getNobelPrize(): void {
    this.nobelService.showSpinner = true;
    this.activatedRoute.params
      .pipe(
        switchMap(({awardYear}) => this.nobelService
          .getNobelPrizesByCategoryAndYear(this.getCategory(), this.getAwardYear()))
      )
      .subscribe(nobelPrize => {
        this.nobelPrize = nobelPrize as NobelPrizeModel;
        this.nobelService.showSpinner = false;
      });
  }

}
