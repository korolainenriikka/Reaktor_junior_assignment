/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Availability, AvailabilityData } from '../types'

const isString = (param: any): param is string => {
  return typeof param === 'string' || param instanceof String
}

const parseToString = (param: any): string => {
  if (!param || !isString(param)){
    throw new Error(`Incorrect or missing id: ${String(param)}`)
  }
  return param
}

const isAvailability = (param: any): param is Availability => {
  return Object.values(Availability).includes(param)
}

const toAvailability = (param: any): Availability => {
  const parser = new DOMParser()
  const availabilityObject = parser.parseFromString(param, 'text/xml')
  console.log(availabilityObject.AVAILABILITY)
  console.log('availability:')
  console.log(param)
  if (!param ||!isAvailability(param)) {
    throw new Error(`Incorrect or missing availability: ${String(param)}`)
  }

  return param
}

const toAvailabilityData = (item: any): AvailabilityData => {
  return {
    id: parseToString(item.id),
    availability: toAvailability(item.DATAPAYLOAD)
  }
}

const toAvailabilityDataArray = (array: any[]):AvailabilityData[] => {
  return array.map(item => toAvailabilityData(item))
}

export const axiosResToAvailabilityData = (object: any): AvailabilityData[] => {
  if (object.data.response && Array.isArray(object.data.response)) {
    return toAvailabilityDataArray(object.data.response)
  } else {
    throw new Error('unexpected response format')
  }
}
