import React from 'react'

import { Category, Item } from '../types'

import ProductTable from './ProductTable'

interface PageProps {
  items: Item[],
  category: Category;
}

const Page: React.FC<PageProps> = (props: PageProps) => {
  return (
    <div>
      In category: {props.category}
      <ProductTable items={props.items} />
    </div>
  )
}

export default Page