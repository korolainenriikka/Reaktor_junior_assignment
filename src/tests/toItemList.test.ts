/* eslint-disable @typescript-eslint/no-empty-function */
import { toItemList } from '../utils/toItemList'

const validItem = {
  id: '3d55ab6b9ce9a6dfb2c952',
  type: 'beanies',
  name: 'KOLOOTVE CITY',
  color: ['blue'],
  price: 10,
  manufacturer: 'juuran',
}

test('non-array data throws error', () => {
  const data = 12345
  expect(() => toItemList(data)).toThrow('Product data missing or malformatted')
})

test('data array with one object not of type item throws error', () => {
  const data = [
      validItem,
      'abc'
    ]

  expect(() => toItemList(data)).toThrow('Incorrect or missing id: undefined')
})

test('item with malformatted id throws error', () => {
  const data = [
    {
      ...validItem,
      id: 123,
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing id: 123')
})

test('item with unexpected category throws error', () => {
  const data = [
    {
      ...validItem,
      type: 'trousers',
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing category: trousers')
})

test('item with missing category throws error', () => {
  const data = [
    {
      id: '3d55ab6b9ce9a6dfb2c952',
      name: 'KOLOOTVE CITY',
      color: ['blue'],
      price: 10,
      manufacturer: 'juuran',
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing category: undefined')
})

test('item with non-array color information throws error', () => {
  const data = [
    {
      ...validItem,
      color: 'black',
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing color: black')
})

test('item with non-string color throws error', () => {
  const data = [
    {
      ...validItem,
      color: 123,
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing color: 123')
})

test('item with missing color throws error', () => {
  const data = [
    {
      id: '3d55ab6b9ce9a6dfb2c952',
      type: 'beanies',
      name: 'KOLOOTVE CITY',
      price: 10,
      manufacturer: 'juuran',
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing color: undefined')
})

test('item with non-number price throws error', () => {
  const data = [
    {
      ...validItem,
      price: '$12',
    }
  ]
  expect(() => toItemList(data)).toThrow('Ìncorrect or missing price: $12')
})

test('item with missing price throws error', () => {
  const data = [
    {
      id: '3d55ab6b9ce9a6dfb2c952',
      type: 'beanies',
      name: 'KOLOOTVE CITY',
      color: ['blue'],
      manufacturer: 'juuran',
    }
  ]
  expect(() => toItemList(data)).toThrow('Ìncorrect or missing price: undefined')
})

test('item with non-string manufacturer throws error', () => {
  const data = [
    {
      ...validItem,
      manufacturer: 14598666,
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing manufacturer: 14598666')
})

test('item with missing manufacturer throws error', () => {
  const data = [
    {
      id: '3d55ab6b9ce9a6dfb2c952',
      type: 'beanies',
      name: 'KOLOOTVE CITY',
      color: ['blue'],
      price: 10,
    }
  ]
  expect(() => toItemList(data)).toThrow('Incorrect or missing manufacturer: undefined')
})

test('array of valid items returns array of type item', () => {
  const data = [
    validItem,
    {
      id: '01ac7e4f3a5c873c061',
      type: 'beanies',
      name: 'ÖISLEAVE SWEET',
      color: ['red'],
      price: 94,
      manufacturer: 'juuran',
    }
  ]
  const itemList = toItemList(data)
  expect(itemList.length).toBe(2)
})
