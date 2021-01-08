import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import { Item, Availability, Category } from '../../types'
import Page from '../../components/Page'

const pageContent: Item[] = [
  {
    id: "aje14l290vlk490sf",
    type: Category.Facemasks,
    name: "FUNMASK",
    color: ["pink", "white"],
    price: 123,
    manufacturer: "abiplos",
    availability: Availability.InStock,
  },
  {
    id: "akjl3i2ru283jfoad",
    type: Category.Facemasks,
    name: "NINJAMASK",
    color: ["black"],
    price: 1000,
    manufacturer: "abiplos",
    availability: Availability.InStock,
  }
]

test('renders category name', () => {
  const component = render(
    <Page items={pageContent} category={Category.Facemasks}/>
  )

  expect(component.container).toHaveTextContent(
    'In category: facemasks'
  )
})

test('renders table headings', () => {
  const component = render(
    <Page items={pageContent} category={Category.Facemasks}/>
  )

  expect(component.container).toHaveTextContent('id')
  expect(component.container).toHaveTextContent('name')
  expect(component.container).toHaveTextContent('colors')
  expect(component.container).toHaveTextContent('manufacturer')
  expect(component.container).toHaveTextContent('price')
  expect(component.container).toHaveTextContent('availability')
})

test('renders id, name, price, manufacturer and availability information', () => {
  const component = render(
    <Page items={pageContent} category={Category.Facemasks}/>
  )

  pageContent.forEach(item => {
    expect(component.container).toHaveTextContent(item.id)
    expect(component.container).toHaveTextContent(item.name)
    expect(component.container).toHaveTextContent(String(item.price))
    expect(component.container).toHaveTextContent(item.manufacturer)
    expect(component.container).toHaveTextContent("INSTOCK")
  })
})

test('renders colors of each item separated by comma', () => {
  const component = render(
    <Page items={pageContent} category={Category.Facemasks}/>
  )

  expect(component.container).toHaveTextContent('pink, white')
  expect(component.container).toHaveTextContent('black')
})