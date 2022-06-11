import {Component, OnInit} from '@angular/core';
import {NobelService} from '../../services/nobel.service';
import {GalardonLabelsModel} from '../../models/nobel.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-galardon',
  templateUrl: './galardon.component.html',
  styleUrls: ['./galardon.component.scss']
})
export class GalardonComponent implements OnInit {

  public labels: GalardonLabelsModel = {
    name: 'Nombre',
    contribution: 'Contribución',
    motive: 'Motivo',
    return: 'Volver'
  }

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
    this.nobelService.searchNobelPrizeByCategoryAndYear(this.getCategory(), this.getAwardYear())
  }

}
