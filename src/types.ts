export enum category {
  Jackets ='jackets',
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