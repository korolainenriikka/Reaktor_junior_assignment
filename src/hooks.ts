import { useEffect, useState } from 'react'
import axios from 'axios'
import { QueryFunction, QueryObserverOptions, QueryObserverResult, useQueries, useQuery } from 'react-query'
import { AvailabilityData, Item, ProductHook, QueryResult } from './types'
import { resToAvailabilityData } from './utils/toAvailabilityData'
import { toItemList } from './utils/toItemList'

export const useProducts = (): ProductHook => {
  const { data: glovesData } = useGloves()
  const { data: facemasksData } = useFacemasks()
  const { data: beaniesData } = useBeanies()

  const [gloves, setGloves] = useState<Item[]>([])
  const [facemasks, setFacemasks] = useState<Item[]>([])
  const [beanies, setBeanies] = useState<Item[]>([])

  const [manufacturers, setManufacturers] = useState<string[]>([])
  const availabilityHooks: QueryObserverResult[] = useAvailability(manufacturers)
  const availabilityTypeChecked = availabilityHooks.map(h => {
    return { ...h, data: dataToAvailabilities(h.data) }
  })

  //ISSUE: infinite re-rendering
  useEffect(() => {
    setGloves(glovesData)
    setFacemasks(facemasksData)
    setBeanies(beaniesData)
  }, [beaniesData, facemasksData, glovesData])

  useEffect(() => {
    setManufacturers(findManufacturers(gloves, facemasks, beanies))

    availabilityTypeChecked.forEach(h => {
      if (h.data.length !== 0) {
        setGloves(addAvailability(gloves, h.data))
        setFacemasks(addAvailability(gloves, h.data))
        setBeanies(addAvailability(gloves, h.data))
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[gloves, facemasks, beanies])

  return {gloves, facemasks, beanies}
}

const useGloves = (): QueryResult => {
  const hook = useQuery('gloves', () => axios.get('/products/gloves'), { staleTime: 3*60*1000 })
  return { ...hook, data: dataToItems(hook.data) }
}

const useFacemasks = (): QueryResult => {
  const hook = useQuery('facemasks', () => axios.get('/products/facemasks'), { staleTime: 3*60*1000 })
  return { ...hook, data: dataToItems(hook.data), }
}

const useBeanies = (): QueryResult => {
  const hook = useQuery('beanies', () => axios.get('/products/beanies'), { staleTime: 3*60*1000 })
  return { ...hook, data: dataToItems(hook.data), }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataToItems = (hookData: any): Item[] => {
  let dataAsItems: Item[]
  try {
    dataAsItems = toItemList(hookData)
  } catch {
    dataAsItems = []
  }
  return dataAsItems
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataToAvailabilities = (hookData: any): AvailabilityData[] => {
  let dataAsAvailability: AvailabilityData[]
  try {
    dataAsAvailability = resToAvailabilityData(hookData)
  } catch {
    dataAsAvailability = []
  }
  return dataAsAvailability
}

const useAvailability = (manufacturers: string[]): QueryObserverResult[] => {
  const queries: QueryObserverOptions[] = []
  manufacturers.forEach(m => {
    queries.push({ queryKey: `availability: ${m}`, queryFn: fetchAvailabilityData(m), staleTime: 3*60*1000 })
  })
  return useQueries(queries)
}

const fetchAvailabilityData = (manufacturer: string): QueryFunction<unknown> => (
  () => axios.get(`/availability/${manufacturer}`)
)

const findManufacturers = (...lists: Item[][]): string[] => {
  const allManufacturers:string[] = []
  lists.forEach(list => list.forEach(item => allManufacturers.push(item.manufacturer)))
  const uniques = [...new Set(allManufacturers)]
  return uniques
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
