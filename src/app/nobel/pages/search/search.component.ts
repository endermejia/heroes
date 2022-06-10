import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryModel, LabelsModel, NobelPrizeModel, NobelPrizesDataModel} from '../../models/nobel.model';
import {NobelService} from '../../services/nobel.service';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  public labels: LabelsModel = {
    title: 'Buscador datos Premio Nobel',
    search: 'Buscar',
    categories: 'Categorías',
    nobelPrizeYear: 'Año desde',
    yearTo: 'Año hasta',
    table: {
      dateAwarded: 'Año',
      laureates: 'Galardonado/s',
      actions: 'Acciones'
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

  public showSpinner: boolean = false;

  public nobelPrizesData: NobelPrizesDataModel | null = null;

  public displayedColumns: string[] = [
    this.labels.table.dateAwarded,
    this.labels.table.laureates,
    this.labels.table.actions
  ];

  public formGroup: FormGroup = this.formBuilder.group({
    category: ['', [Validators.required]],
    nobelPrizeYear: ['', [Validators.required]],
    yearTo: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private nobelService: NobelService
  ) {
  }

  ngOnInit(): void {
  }

  public search(): void {
    if (this.formGroup.valid) {
      // if (true) {
      console.log(this.formGroup.value);
      this.showSpinner = true;
      this.nobelService.getNobelPrizeByCategoryAndYear(
        this.formGroup.value.category,
        this.formGroup.value.nobelPrizeYear.getFullYear(),
        this.formGroup.value.yearTo.getFullYear()
      ).subscribe(
        (data: Object) => {
          this.nobelPrizesData = data as NobelPrizesDataModel;
          // TODO: Delete. Timeout for show spinner.
          setTimeout(() => {
            this.showSpinner = false;
          }, 1000);
        }
      );
    }
  }

  public getLaureates(nobelPrize: NobelPrizeModel): string {
    return nobelPrize?.laureates?.length > 0
      ? nobelPrize.laureates.map(laureate => laureate.knownName?.en || laureate.orgName?.en).join(', ')
      : nobelPrize.topMotivation?.en.split('.')[0] || '-';
  }

  // TODO: Only year in calendar.
  setYear(eventDate: Date, datePicker: MatDatepicker<any>, formGroupName: string): void {
    this.formGroup.get(formGroupName)?.setValue(eventDate);
    datePicker.close();
  }

}
