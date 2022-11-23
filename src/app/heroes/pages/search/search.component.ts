import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchLabels, Heroe} from '../../models/heroes.model';
import {HeroesService} from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  public heroes: Heroe[] = [];

  public labels: SearchLabels = {
    title: 'Buscador datos Heroes',
    add: 'Añadir',
    edit: 'Editar',
    delete: 'Eliminar',
    hero: 'Heroe',
    search: 'Buscar',
    filter: 'Filtro',
    table: {
      name: 'Nombre',
      publisher: 'Editorial',
      actions: 'Acciones'
    },
    validation: {
      required: 'El campo es requerido',
      maxLength: 'El campo debe tener máximo 50 caracteres',
      minLength: 'El campo debe tener mínimo 3 caracteres'
    }
  };


  public displayedColumns: string[] = [
    this.labels.table.name,
    this.labels.table.publisher,
    this.labels.table.actions
  ];

  public searchForm: FormGroup = this.fb.group({
    filter: [
      '',
      [Validators.minLength(3), Validators.maxLength(50)]
    ]
  });

  constructor(
    public heroesService: HeroesService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.search();
  }

  public deleteHeroe(id: string): void {
    this.heroesService.deleteHeroe(id).subscribe(() => {
      this.search();
    });
  }

  public search(): void {
    if (this.searchForm.valid) {
      this.heroesService.getHeroes(this.searchForm.value.filter).subscribe(
        (heroes: Heroe[]) => {
          this.heroes = heroes;
        }
      );
    }
  }

}
