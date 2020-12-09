import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './components/Page'
import { category, Item } from './types'

import axios from 'axios'

import { useStateValue, setItems } from './state'
import { API_URL } from './constants'
import { axiosResToAvailabilityData } from './utils/toAvailabilityData'

const App: React.FC = () => {
  const [state, dispatch] = useStateValue()
  console.log(state)
  let manufacturers = []

  const fetchAvailabilityData = (manufacturerName: string) => {
      axios.get(
        `${API_URL}/availability/${manufacturerName}`
      ).then( response => {
        //IN UTIL: convert res to availabilitydata
        console.log(response)
        const availabilityData = axiosResToAvailabilityData(response)
        console.log(availabilityData)
        //dispatch(updateAvailability(response.data.response))
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const { data: jacketListFromApi } = await axios.get<Item[]>(
          `${API_URL}/products/jackets`
        )
        manufacturers = findManufacturers(jacketListFromApi)
        dispatch(setItems(jacketListFromApi, category.Jackets))

        const { data: shirtListFromApi } = await axios.get<Item[]>(
          `${API_URL}/products/shirts`
        )
        manufacturers = findManufacturers(shirtListFromApi)
        dispatch(setItems(shirtListFromApi, category.Shirts))

        const { data: accessoriesListFromApi } = await axios.get<Item[]>(
          `${API_URL}/products/accessories`
        )
        manufacturers = findManufacturers(accessoriesListFromApi)
        dispatch(setItems(accessoriesListFromApi, category.Accessories))

        manufacturers.forEach(m => fetchAvailabilityData(m))
      } catch (e) {
        console.error(e)
      }
    }

    const findManufacturers = (items: Item[]): string[] => {
      const allManufacturers = items.map(i => i.manufacturer)
      const uniques = [...new Set(allManufacturers)]
      return uniques
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchItemList()
  }, [dispatch])

 /* useEffect(() => {
    const fetchAvailabilityData = async () => {
      try {

      } catch (e) {
        console.error(e)
      }
    }
  }, [])*/

  return (
    <div>
      <h1>Inventory</h1>
      <Router>
        <button>
          <Link to="/jackets">Jackets</Link>
        </button>
        <button>
          <Link to="/shirts">Shirts</Link>
        </button>
        <button>
          <Link to="/accessories">Accessories</Link>
        </button>

        <Switch>
          <Route path="/jackets" render={() =>
            <Page
              category={category.Jackets}
              items={state.jackets}
            />}
          />
          <Route path="/shirts" render={() =>
            <Page
              category={category.Shirts}
              items={state.shirts}
            />}
          />
          <Route path="/accessories" render={() =>
            <Page
              category={category.Accessories}
              items={state.accessories}
            />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
