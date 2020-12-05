import React, { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'
import { Item } from '../types'

const AccessoriesPage: React.FC = () => {

  useEffect(() => {
    axios.get<Item[]>(`${API_URL}/products/accessories`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error ) => {
        console.log(error)
      }) 
  })

  return (
    <div>
      In category: Accessories
    </div>
  )
}

export default AccessoriesPage