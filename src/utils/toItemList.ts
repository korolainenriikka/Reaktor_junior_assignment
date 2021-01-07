/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Category, Item } from '../types'

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String
}

const toString = (param: any, field: string): string => {
  if (!param || !isString(param)){
    throw new Error(`Incorrect or missing ${field}: ${String(param)}`)
  }
  return param
}

const isCategory = (param: any): param is Category => {
  return Object.values(Category).includes(param)
}

const toCategory = (param: any): Category => {
  if (!param || !isCategory(param)){
    throw new Error(`Incorrect or missing category: ${String(param)}`)
  }
  return param
}

const isNumberValue = (param: any): param is number => {
    return typeof param === 'number' || param instanceof Number
}

const toNumber = (param: any, field: string): number => {
  if (!param || !isNumberValue(param)){
    throw new Error(`Ìncorrect or missing ${field}: ${String(param)}`)
  }
  return param
}

const toItem = (object: any): Item => {
  return {
    id: toString(object.id, 'id'),
    type: toCategory(object.category),
    name: toString(object.name, 'name'),
    color: toString(object.color, 'color'),
    price: toNumber(object.price, 'price'),
    manufacturer: toString(object.manufacturer, 'manufacturer'),
    availability: undefined,
  }
}

const toItemArray = (array: any[]): Item[] => {
  return array.map(object => toItem(object))
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toItemList = (data: any): Item[] => {
  if (data && Array.isArray(data)) {
    return toItemArray(data)
  } else {
    throw new Error('Product data missing')
  }
}

export default toItemList