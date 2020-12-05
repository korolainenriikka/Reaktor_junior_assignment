import React from 'react'
import { Item } from '../types'

interface TableProps {
  items: Item[];
}

const ProductTable: React.FC<TableProps> = (props) => {
  return (
    <table>
      <th>
        <td>id</td>
        <td>name</td>
        <td>colors</td>
        <td>manufacturer</td>
        <td>availability</td>
      </th>
      <tbody>
        {props.items.map(i => (
          <tr key={i.id}>
            <td>{i.id}</td>
            <td>{i.name}</td>
            <td>{i.color}</td>
            <td>{i.manufacturer}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable