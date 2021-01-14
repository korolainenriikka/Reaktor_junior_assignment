/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Item, AvailabilityData } from '../types'
import { resToAvailabilityData } from '../type_checkers/toAvailabilityData'
import { toItemList } from '../type_checkers/toItemList'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dataToItems = (hookData: any): Item[] => {
  let dataAsItems: Item[]
  try {
    dataAsItems = toItemList(hookData)
  } catch {
    //throw err -> refetch data
    dataAsItems = []
  }
  return dataAsItems
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const dataToAvailabilities = (hookData: any): AvailabilityData[] => {
  let dataAsAvailability: AvailabilityData[]
  try {
    dataAsAvailability = resToAvailabilityData(hookData)
  } catch {
    dataAsAvailability = []
  }
  return dataAsAvailability
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchAvailabilityData = (manufacturer: string): Promise<any> => (
  axios.get(`/availability/${manufacturer}`)
)

export const findManufacturers = (...lists: Item[][]): string[] => {
  const allManufacturers:string[] = []
  lists.forEach(list => list.forEach(item => allManufacturers.push(item.manufacturer)))
  const uniques = [...new Set(allManufacturers)]
  return uniques
}

export const addAvailability = (initalItems: Item[], availabilityData: AvailabilityData[]): Item[] => {
  return initalItems.map(i => {
    const itemAvailability = availabilityData.find(datapoint => datapoint.id.toLowerCase() === i.id)
        if (itemAvailability) {
          i.availability = itemAvailability.availability
        }
        return i
  })
}