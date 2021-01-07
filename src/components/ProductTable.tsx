import React from 'react'
import { Item } from '../types'

interface TableProps {
  items: Item[];
}

const ProductTable: React.FC<TableProps> = (props) => {
  const toColorString = (color: string[]): string => {
    let str = ''
    color.forEach(c => {
      str = str.concat(`${c}, `)})
    return str.slice(0, -2)
  }

  return (
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
  )
}

export default ProductTable