/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import parser from 'fast-xml-parser'
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

const toAvailability = (availabilityInXml: any): Availability => {
  try {
    const availabilityInJSON = parser.parse(availabilityInXml)
    const availability = availabilityInJSON.AVAILABILITY.INSTOCKVALUE

    if (!isAvailability(availability)) {
      throw new Error(`Incorrect or missing availability data`)
    }
    return availability

  } catch (e) {
    throw new Error(`Missing availability data or unexpected format: ${String(availabilityInXml)}`)
  }
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const resToAvailabilityData = (response: any): AvailabilityData[] => {
  if (response.data.response && Array.isArray(response.data.response)) {
    return toAvailabilityDataArray(response.data.response)
  } else {
    throw new Error('unexpected response format')
  }
}
