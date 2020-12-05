import React, { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants'
import { Item } from '../types'

const JacketsPage: React.FC = () => {

  useEffect(() => {
    axios.get<Item[]>(`${API_URL}/products/jackets`)
     .then((response) => {
       console.log(response.data)
     })
     .catch((error ) => {
       console.log(error)
     }) 
  })

  return (
    <div>
      In category: Jackets
    </div>
  )
}

export default JacketsPage