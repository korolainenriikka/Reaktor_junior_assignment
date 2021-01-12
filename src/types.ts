export enum Category {
  Gloves = 'gloves',
  Facemasks = 'facemasks',
  Beanies = 'beanies'
}

export interface Item {
  id: string;
  type: Category;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
  availability: Availability | undefined;
}

export enum Availability {
  InStock = 'INSTOCK',
  LessThan10 = 'LESSTHAN10',
  OutOfStock = 'OUTOFSTOCK'
}

export interface AvailabilityData {
  id: string;
  availability: Availability;
}

export interface AvailabilityResponse {
  status: number,
  response: AvailabilityData[]
}

export interface QueryResult {
  data: Item[],
  isLoading: boolean,
  isError: boolean
}

export interface ProductHook {
  gloves: Item[],
  facemasks: Item[],
  beanies: Item[],
  /*isLoading: boolean,
  isError: boolean,
  isUpdating: boolean,*/
}
