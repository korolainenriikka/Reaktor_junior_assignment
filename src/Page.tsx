import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from './constants'
import { Item } from './types'
import ProductTable from './components/ProductTable'
import { useStateValue } from './state'

interface PageProps {
  category: string;
}

const Page: React.FC<PageProps> = (props) => {
  const category = props.category
  const [items, setItems] = useState<Item[]>([])

  const state = useStateValue()
  console.log(state)

  useEffect(() => {
    axios.get<Item[]>(`${API_URL}/products/${category}`)
      .then((response) => {
        setItems(response.data)
      })
      .catch((error ) => {
        console.log(error)
      })
  }, [category])

  return (
    <div>
      In category: {category}
      <ProductTable items={items} />
    </div>
  )
}

export default Page