export interface SearchLabels {
  title: string;
  add: string;
  edit: string;
  delete: string;
  hero: string;
  search: string;
  filter: string;
  table: TableLabels;
  validation: ValidationLabels;
}

export interface TableLabels {
  name: string;
  publisher: string;
  actions: string;
}

export interface ValidationLabels {
  required: string;
  maxLength: string;
  minLength: string;
}

export interface Heroe {
  id: string;
  name: string;
  publisher: string;
  alter_ego: string;
  first_appearance: string;
  characters: string;
}
