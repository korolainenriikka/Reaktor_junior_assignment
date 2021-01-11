/* eslint-disable @typescript-eslint/no-unused-vars */ /*rm when state -> hooks done!!*/
import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'
import { AvailabilityData, Category, Item } from '../types'
import { toItemList } from '../utils/toItemList'

import axios from 'axios'
import { useGloves, useFacemasks, useBeanies, useAvailability } from '../hooks'

import { resToAvailabilityData } from '../utils/toAvailabilityData'

const App: React.FC = () => {
  const [gloves, setGloves] = useState<Item[]>([])
  const [facemasks, setFacemasks] = useState<Item[]>([])
  const [beanies, setBeanies] = useState<Item[]>([])

  const [manufacturers, setManufacturers] = useState<string[]>([])
  const [clientStateUpdated, setClientStateUpdated] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: glovesResponse, isLoading: isLoadingGloves, isStale: isStaleGloves } = useGloves()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: facemasksResponse, isLoading: isLoadingFacemasks, isStale: isStaleFacemasks } = useFacemasks()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: beaniesResponse, isLoading: isLoadingBeanies, isStale: isStaleBeanies } = useBeanies()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const results = useAvailability(manufacturers)
  results.forEach(r => {
    if (!r.isLoading) {
      console.log(r.data)
    }
  })
  console.log(manufacturers)
  useEffect(() => {
    if (!clientStateUpdated &&
      !isLoadingGloves && !isLoadingFacemasks && !isLoadingBeanies) {
      console.log('we got data we updatin')
      const updatedGloves = toItemList(glovesResponse)
      setGloves(updatedGloves)

      const updatedFacemasks = toItemList(facemasksResponse)
      setFacemasks(updatedFacemasks)

      const updatedBeanies = toItemList(beaniesResponse)
      setBeanies(updatedBeanies)

      setManufacturers(findManufacturers(updatedGloves, updatedFacemasks, updatedBeanies))
      setClientStateUpdated(true)
    }

    if (isStaleGloves || isStaleFacemasks || isStaleBeanies) {
      console.log('datas stale set to refetch')
      setClientStateUpdated(false)
    }
    //find manufacturers and update => effect hook w menufacturer dependency in actionn
  }, [glovesResponse, facemasksResponse, beaniesResponse, isLoadingBeanies,
    isLoadingGloves, isLoadingFacemasks, gloves, facemasks, beanies, clientStateUpdated, isStaleGloves, isStaleFacemasks, isStaleBeanies])


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
