import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'
import { Item } from '../types'
import ProductTable from '../components/ProductTable'

const AccessoriesPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    axios.get<Item[]>(`${API_URL}/products/accessories`)
      .then((response) => {
        console.log(response.data)
        setItems(response.data)
      })
      .catch((error ) => {
        console.log(error)
      }) 
  })

  return (
    <div>
      In category: Accessories
      <ProductTable items={items} />
    </div>
  )
}

export default AccessoriesPage