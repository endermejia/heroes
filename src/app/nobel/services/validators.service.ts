import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() {
  }

  public yearToSuperiorThanYearFrom(control: FormControl): { [s: string]: boolean } | null {
    const yearFrom = control.parent?.get('nobelPrizeYear')?.value;
    const yearTo = control.parent?.get('yearTo')?.value;
    if (yearFrom && yearTo && yearFrom.getFullYear() > yearTo.getFullYear()) {
      return {yearToSuperiorThanYearFrom: true};
    }
    return null;
  }

  public maxRangeOfYears(control: FormControl): { [s: string]: boolean } | null {
    const yearFrom = control.parent?.get('nobelPrizeYear')?.value;
    const yearTo = control.parent?.get('yearTo')?.value;
    if (yearFrom && yearTo && (yearTo.getFullYear() - yearFrom.getFullYear()) > 15) {
      return {maxRangeOfYears: true};
    }
    return null;
  }
}
