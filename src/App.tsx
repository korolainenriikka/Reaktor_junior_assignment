/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './components/Page'
import { Category, Item } from './types'
import toItemList from './utils/toItemList'

import axios from 'axios'

import { useStateValue, setItems /*, updateAvailability*/ } from './state'
import { API_URL } from './constants'
import { axiosResToAvailabilityData } from './utils/toAvailabilityData'

const App: React.FC = () => {
  const [state, dispatch] = useStateValue()
  console.log(state)

  const fetchAvailabilityData = (manufacturerName: string) => {
      axios.get(
        `${API_URL}/availability/${manufacturerName}`
      ).then(response => {
        console.log(response)
        const availabilityData = axiosResToAvailabilityData(response)
        console.log(availabilityData)
        //dispatch(updateAvailability(availabilityData))
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const glovesRes: Response = await fetch(
          `${API_URL}/products/gloves`
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const glovesData = await glovesRes.json()
        console.log(glovesData)
        const glovesListFromApi = toItemList(glovesData)

        dispatch(setItems(glovesListFromApi, Category.Gloves))

        const maskRes: Response = await fetch(
          `${API_URL}/products/facemasks`
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const maskData = await maskRes.json()
        const facemasksListFromApi = toItemList(maskData)

        dispatch(setItems(facemasksListFromApi, Category.Facemasks))

        const beaniesRes: Response = await fetch(
          `${API_URL}/products/beanies`
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const beaniesData = await beaniesRes.json()
        const beaniesListFromApi = toItemList(beaniesData)

        dispatch(setItems(beaniesListFromApi, Category.Beanies))

        const manufacturers = findManufacturers(glovesListFromApi, facemasksListFromApi, beaniesListFromApi)
        manufacturers.forEach(m => fetchAvailabilityData(m))
      } catch (e) {
        console.error(e)
      }
    }

    const findManufacturers = (...lists: Item[][]): string[] => {
      const allManufacturers:string[] = []
      lists.forEach(list => list.forEach(item => allManufacturers.push(item.manufacturer)))
      const uniques = [...new Set(allManufacturers)]
      return uniques
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchItemList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div>
      <h1>Inventory</h1>
      <Router>
        <button>
          <Link to="/gloves">Gloves</Link>
        </button>
        <button>
          <Link to="/facemasks">Face masks</Link>
        </button>
        <button>
          <Link to="/beanies">Beanies</Link>
        </button>

        <Switch>
          <Route path="/jackets" render={() =>
            <Page
              category={Category.Gloves}
              items={state.gloves}
            />}
          />
          <Route path="/shirts" render={() =>
            <Page
              category={Category.Facemasks}
              items={state.facemasks}
            />}
          />
          <Route path="/accessories" render={() =>
            <Page
              category={Category.Beanies}
              items={state.beanies}
            />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
