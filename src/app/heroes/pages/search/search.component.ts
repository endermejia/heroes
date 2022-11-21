import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryModel, SearchLabelsModel, NobelPrizeModel} from '../../models/heroes.model';
import {HeroesService} from '../../services/heroes.service';
import {MatDatepicker} from '@angular/material/datepicker';
import {ValidatorsService} from "../../services/validators.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  public labels: SearchLabelsModel = {
    title: 'Buscador datos Heroes',
    search: 'Buscar',
    categories: 'Categorías',
    nobelPrizeYear: 'Año desde',
    yearTo: 'Año hasta',
    table: {
      dateAwarded: 'Año',
      laureates: 'Galardonado/s',
      actions: 'Acciones'
    },
    validation: {
      required: 'El campo es requerido',
      maxRangeOfYears: 'El rango de años no puede ser superior a 15',
      yearToSuperiorThanYearFrom: 'Año desde: nobelPrizeYear no puede ser mayor que año hasta: yearTo'
    }
  };

  // Los ids de las categorías: ['che', 'eco', 'lit', 'pea', 'phy', 'med'].
  public categories: CategoryModel[] = [
    {id: 'che', value: 'Química'},
    {id: 'eco', value: 'Economía'},
    {id: 'lit', value: 'Literatura'},
    {id: 'pea', value: 'Paz'},
    {id: 'phy', value: 'Física'},
    {id: 'med', value: 'Medicina'},
  ];

  public displayedColumns: string[] = [
    this.labels.table.dateAwarded,
    this.labels.table.laureates,
    this.labels.table.actions
  ];

  public formGroup: FormGroup = this.formBuilder.group({
    category: [
      '',
      [Validators.required]
    ],
    nobelPrizeYear: [
      '',
      [Validators.required, this.validatorService.maxRangeOfYears, this.validatorService.yearToSuperiorThanYearFrom]
    ],
    yearTo: [
      '',
      [Validators.required, this.validatorService.maxRangeOfYears, this.validatorService.yearToSuperiorThanYearFrom]
    ]
  });

  constructor(
    public nobelService: HeroesService,
    private formBuilder: FormBuilder,
    private validatorService: ValidatorsService
  ) {
  }

  ngOnInit(): void {
  }

  public search(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.nobelService.showSpinner = true;
      this.nobelService.searchNobelPrizesByCategoryAndYears(
        this.formGroup.value.category,
        this.formGroup.value.nobelPrizeYear.getFullYear(),
        this.formGroup.value.yearTo.getFullYear()
      );
    }
  }

  public getCategoryAndYear(nobelPrize: NobelPrizeModel): string {
    return `galardon/${nobelPrize.category.en}-${nobelPrize.awardYear}`;
  }

  // TODO: Only year in calendar.
  public setYear(eventDate: Date, datePicker: MatDatepicker<any>, formGroupName: string): void {
    this.formGroup?.get(formGroupName)?.setValue(eventDate);
    datePicker.close();
  }

  public get yearToSuperiorThanYearFrom(): boolean {
    const yearFrom = this.formGroup?.get('nobelPrizeYear')?.value;
    const yearTo = this.formGroup?.get('yearTo')?.value;
    return yearFrom && yearTo && yearFrom.getFullYear() > yearTo.getFullYear();
  }

  public get maxRangeOfYears(): boolean {
    const yearFrom = this.formGroup?.get('nobelPrizeYear')?.value;
    const yearTo = this.formGroup?.get('yearTo')?.value;
    return yearFrom && yearTo && (yearTo.getFullYear() - yearFrom.getFullYear()) > 15;
  }

  public get yearToSuperiorThanYearFromError(): string {
    const yearFrom = this.formGroup?.get('nobelPrizeYear')?.value;
    const yearTo = this.formGroup?.get('yearTo')?.value;
    return this.labels.validation.yearToSuperiorThanYearFrom
      .replace('nobelPrizeYear', yearFrom?.getFullYear().toString())
      .replace('yearTo', yearTo?.getFullYear().toString());
  }

}
