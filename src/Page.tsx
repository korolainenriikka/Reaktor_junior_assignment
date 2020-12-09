import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useStateValue, setItems } from './state'
import { API_URL } from './constants'
import { category, Item } from './types'

import ProductTable from './components/ProductTable'

interface PageProps {
  items: Item[],
  category: category;
}

const Page: React.FC<PageProps> = (props: PageProps) => {
  const category = props.category
  const [items, setItemz] = useState<Item[]>([])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useStateValue()
  console.log(state)

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const { data: itemListFromApi } = await axios.get<Item[]>(
          `${API_URL}/products/${category}`
        )
        setItemz(itemListFromApi)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        dispatch(setItems(itemListFromApi, category))
      } catch (e) {
        console.error(e)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchItemList()

  }, [category, dispatch])

  return (
    <div>
      In category: {category}
      <ProductTable items={items} />
    </div>
  )
}

export default Page