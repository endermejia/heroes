import {Component, OnInit} from '@angular/core';
import {NobelService} from '../../services/nobel.service';
import {GalardonLabelsModel, LaureateModel} from '../../models/nobel.model';
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

  public getLaureateNames(laureate: LaureateModel): string {
    return laureate.knownName?.en || laureate.orgName?.en || '-';
  }

  public getLaureateContribution(laureate: LaureateModel): string {
    return laureate.portion
      ? (Number(this.getPortionNumberByStringFraction(laureate.portion)) * 100) + ' %'
      : '-';
  }

  public getLaureateMotive(laureate: LaureateModel): string {
    return laureate.motivation?.en || '-';
  }

  private getPortionNumberByStringFraction(portion: string): Number {
    const fraction = portion.split('/');
    const fraction0 = Number(fraction[0]) || 0;
    const fraction1 = Number(fraction[1]) || 0;
    return fraction.length > 1 ? fraction0 / fraction1 : fraction0;
  }

  private getAwardYear(): string {
    return this.activatedRoute.snapshot.paramMap.get('awardYear')?.split('-').pop() || '';
  }

  private getCategory(): string {
    const category = this.activatedRoute.snapshot.paramMap.get('awardYear')?.split('-').shift() || '';
    return this.categories[category];
  }

  private getNobelPrize(): void {
    this.nobelService.showSpinner = true;
    this.nobelService.searchNobelPrizeByCategoryAndYear(this.getCategory(), this.getAwardYear())
  }

}
