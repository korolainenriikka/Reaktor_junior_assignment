import React from 'react'
import { Item } from '../types'

interface TableProps {
  items: Item[];
}

const ProductTable: React.FC<TableProps> = (props) => {
  return (
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>colors</th>
        <th>manufacturer</th>
        <th>availability</th>
      </tr>
      {props.items.map(i => (
        <tr key={i.id}>
          <td>{i.id}</td>
          <td>{i.name}</td>
          <td>{i.color}</td>
          <td>{i.manufacturer}</td>
        </tr>
      ))}
    </table>
  )
}

export default ProductTable