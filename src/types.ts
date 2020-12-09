export enum category {
  Jackets = 'jackets',
  Shirts = 'shirts',
  Accessories = 'accessories'
}

export interface Item {
  id: string;
  type: category;
  name: string;
  color: string;
  price: number;
  manufacturer: string;
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