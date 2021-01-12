/* eslint-disable @typescript-eslint/no-unused-vars */ /*rm when state -> hooks done!!*/
import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'
import { AvailabilityData, Category, Item } from '../types'
import { toItemList } from '../utils/toItemList'

import { useGloves, useFacemasks, useBeanies, useAvailability } from '../hooks'

import { resToAvailabilityData } from '../utils/toAvailabilityData'

const App: React.FC = () => {

  //const [manufacturers, setManufacturers] = useState<string[]>([])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: glovesData, isLoading: isLoadingGloves } = useGloves()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: facemasksData, isLoading: isLoadingFacemasks } = useFacemasks()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: beaniesData, isLoading: isLoadingBeanies } = useBeanies()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //const results = useAvailability(manufacturers)


  const findManufacturers = (...lists: Item[][]): string[] => {
    const allManufacturers:string[] = []
    lists.forEach(list => list.forEach(item => allManufacturers.push(item.manufacturer)))
    const uniques = [...new Set(allManufacturers)]
    return uniques
  }

  /*useEffect(() => {
    results.forEach(r => {
      if (!r.isLoading) {
        try {
          updateProductAvailabilities(resToAvailabilityData(r.data))
        } catch (e) {
          console.log('random err')
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  const updateProductAvailabilities = (availabilityData: AvailabilityData[]) => {
    setGloves(addAvailability(gloves, availabilityData))
    setFacemasks(addAvailability(facemasks, availabilityData))
    setBeanies(addAvailability(beanies, availabilityData))
  }

  const addAvailability = (initalItems: Item[], availabilityData: AvailabilityData[]): Item[] => {
    return initalItems.map(i => {
      const itemAvailability = availabilityData.find(datapoint => datapoint.id.toLowerCase() === i.id)
          if (itemAvailability) {
            i.availability = itemAvailability.availability
          }
          return i
    })
  }*/

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
          <Route path="/gloves" render={() =>
            <Page
              category={Category.Gloves}
              items={glovesData}
            />}
          />
          <Route path="/facemasks" render={() =>
            <Page
              category={Category.Facemasks}
              items={facemasksData}
            />}
          />
          <Route path="/beanies" render={() =>
            <Page
              category={Category.Beanies}
              items={beaniesData}
            />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
