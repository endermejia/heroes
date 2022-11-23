import {Component, OnInit} from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute} from '@angular/router';
import {HeroDetailLabels} from "../../models/heroes.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  public labels: HeroDetailLabels = {
    title: 'Detalle del Héroe',
    save: 'Guardar',
    hero: 'Héroe',
    name: 'Nombre',
    publisher: 'Editorial',
    alter_ego: 'Alter ego',
    first_appearance: 'Primera aparición',
    cancel: 'Cancelar',
    validation: {
      required: 'El campo es requerido',
      maxLength: 'El campo debe tener máximo 50 caracteres',
      minLength: 'El campo debe tener mínimo 3 caracteres'
    }
  }

  public heroeForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    publisher: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    alter_ego: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    first_appearance: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
  });

  constructor(
    public heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.heroesService.getHeroe(params.id).subscribe(heroe => this.heroeForm.patchValue(heroe));
      }
    });
  }

  public saveHero() {
    if (this.heroeForm.valid) {
      if (this.heroeForm.value.id) {
        this.heroesService.updateHeroe(this.heroeForm.value).subscribe(() => this.goBack());
      } else {
        this.heroesService.addHeroe(this.heroeForm.value).subscribe(() => this.goBack());
      }
    }
  }

  public goBack() {
    this.location.back();
  }

}
