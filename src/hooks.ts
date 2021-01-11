import axios from 'axios'
import { QueryObserverResult, useQuery } from 'react-query'

export const useGloves = (): QueryObserverResult => (
  useQuery('gloves', () => axios.get('/products/gloves'))
)

export const useFacemasks = (): QueryObserverResult => (
  useQuery('facemasks', () => axios.get('/products/facemasks'))
)

export const useBeanies = (): QueryObserverResult => (
  useQuery('beanies', () => axios.get('/products/beanies'))
)

//export const useAvailability = (manufacturer: string): QueryObserverResult => {
//  console.log(manufacturer)
//  return useQuery('availability', (manufacturer: string) => axios.get(`/availability/${manufacturer}`))
//}