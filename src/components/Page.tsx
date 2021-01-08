import React from 'react'

import { Category, Item } from '../types'

interface PageProps {
  items: Item[],
  category: Category;
}

const Page: React.FC<PageProps> = (props: PageProps) => {
  const toColorString = (color: string[]): string => {
    let str = ''
    color.forEach(c => {
      str = str.concat(`${c}, `)})
    return str.slice(0, -2)
  }

  return (
    <div>
      In category: {props.category}
      <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>colors</th>
          <th>manufacturer</th>
          <th>price</th>
          <th>availability</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map(i => (
          <tr key={i.id}>
            <td>{i.id}</td>
            <td>{i.name}</td>
            <td>{toColorString(i.color)}</td>
            <td>{i.manufacturer}</td>
            <td>{i.price}</td>
            <td>{i.availability}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default Page