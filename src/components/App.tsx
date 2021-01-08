/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'
import { Category, Item } from '../types'
import { toItemList } from '../utils/toItemList'

import axios from 'axios'

import { useStateValue, setItems, updateAvailability } from '../state'
import { resToAvailabilityData } from '../utils/toAvailabilityData'

const App: React.FC = () => {
  const [state, dispatch] = useStateValue()
  console.log(state)

  const fetchAvailabilityData = (manufacturerName: string) => {
      fetchData(manufacturerName)
        .then(response => {
          console.log(response)
          try {
            const availabilityData = resToAvailabilityData(response)
            console.log(availabilityData)
            dispatch(updateAvailability(availabilityData))
          } catch (e) {
            console.log('random error !')
            fetchAvailabilityData(manufacturerName)
          }
        })
        .catch(e => {
          console.error(e)
        })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchData = (manufacturerName: string): Promise<any> => (
    axios.get(`/availability/${manufacturerName}`)
  )

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const glovesRes: Response = await fetch(
          `/products/gloves`
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const glovesData = await glovesRes.json()
        console.log(glovesData)
        const glovesListFromApi = toItemList(glovesData)

        dispatch(setItems(glovesListFromApi, Category.Gloves))

        const maskRes: Response = await fetch(
          `/products/facemasks`
        )

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const maskData = await maskRes.json()
        const facemasksListFromApi = toItemList(maskData)

        dispatch(setItems(facemasksListFromApi, Category.Facemasks))

        const beaniesRes: Response = await fetch(
          `/products/beanies`
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
      <Router basename={'/'}>
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
          <Route path="gloves" render={() =>
            <Page
              category={Category.Gloves}
              items={state.gloves}
            />}
          />
          <Route path="/facemasks" render={() =>
            <Page
              category={Category.Facemasks}
              items={state.facemasks}
            />}
          />
          <Route path="/beanies" render={() =>
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
