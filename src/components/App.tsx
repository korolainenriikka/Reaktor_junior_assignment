/* eslint-disable @typescript-eslint/no-unused-vars */ /*rm when state -> hooks done!!*/
import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'
import { AvailabilityData, Category, Item } from '../types'
import { toItemList } from '../utils/toItemList'

import axios from 'axios'
import { useGloves, useFacemasks, useBeanies } from '../hooks'

import { resToAvailabilityData } from '../utils/toAvailabilityData'

const App: React.FC = () => {
  const [gloves, setGloves] = useState<Item[]>([])
  const [facemasks, setFacemasks] = useState<Item[]>([])
  const [beanies, setBeanies] = useState<Item[]>([])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: glovesResponse, isLoading: isLoadingGloves } = useGloves()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: facemasksResponse, isLoading: isLoadingFacemasks } = useFacemasks()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: beaniesResponse, isLoading: isLoadingBeanies } = useBeanies()

  useEffect(() => {
    if (!isLoadingGloves) {
      setGloves(toItemList(glovesResponse))
    }
    if (!isLoadingFacemasks) {
      setFacemasks(toItemList(facemasksResponse))
    }
    if (!isLoadingBeanies) {
      setBeanies(toItemList(beaniesResponse))
    }
  }, [glovesResponse, facemasksResponse, beaniesResponse, isLoadingBeanies, isLoadingGloves, isLoadingFacemasks])

  useEffect(() => {
    const manufacturers = findManufacturers(gloves, facemasks, beanies)
    manufacturers.forEach(m => fetchAvailabilityData(m))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gloves, facemasks, beanies])

  const fetchAvailabilityData = (manufacturerName: string) => {
      fetchData(manufacturerName)
        .then(response => {
          try {
            const availabilityData = resToAvailabilityData(response)
            console.log(availabilityData)
            updateProductAvailabilities(availabilityData)
          } catch (e) {
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

  const findManufacturers = (...lists: Item[][]): string[] => {
    const allManufacturers:string[] = []
    lists.forEach(list => list.forEach(item => allManufacturers.push(item.manufacturer)))
    const uniques = [...new Set(allManufacturers)]
    return uniques
  }

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
  }
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
              items={gloves}
            />}
          />
          <Route path="/facemasks" render={() =>
            <Page
              category={Category.Facemasks}
              items={facemasks}
            />}
          />
          <Route path="/beanies" render={() =>
            <Page
              category={Category.Beanies}
              items={beanies}
            />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
