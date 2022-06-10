export interface CategoryModel {
  id: string;
  value: string;
}

export interface LabelsModel {
  title: string;
  search: string;
  categories: string;
  nobelPrizeYear: string;
  yearTo: string;
  table: TableModel;
}

export interface TableModel {
  dateAwarded: string;
  laureates: string;
  actions: string;
}

export interface NobelPrizesDataModel {
  nobelPrizes: NobelPrizeModel[];
  meta: MetaModel;
}

export interface NobelPrizeModel {
  awardYear: string;
  category: CategoryDataModel;
  categoryFullName: CategoryDataModel;
  dateAwarded: string;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  links: LinkModel[];
  laureates: LaureateModel[];
  topMotivation?: NameModel;
}

export interface CategoryDataModel {
  en: string;
  no: string;
  se: string;
}

export interface LinkModel {
  rel: string;
  href: string;
  action: string;
  types: string;
}

export interface LaureateModel {
  id: string;
  knownName?: NameModel;
  fullName?: NameModel;
  orgName?: NameModel;
  portion: string;
  sortOrder: string;
  motivation: MotivationModel;
  links: LinkModel[];
}

export interface NameModel {
  en: string;
}

export interface MotivationModel {
  en: string;
  se: string;
}

export interface MetaModel {
  count: number;
  disclaimer: string;
  license: string;
  limit: number;
  nobelPrizeCategory: string;
  nobelPrizeYear: number;
  offset: number;
  terms: string;
}
