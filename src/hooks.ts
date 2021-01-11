import axios from 'axios'
import { QueryObserverResult, useQuery } from 'react-query'

export const useGloves = (): QueryObserverResult => (
  useQuery('gloves', () => axios.get('/products/gloves'), { staleTime: 3*60*1000 })
)

export const useFacemasks = (): QueryObserverResult => (
  useQuery('facemasks', () => axios.get('/products/facemasks'), { staleTime: 3*60*1000 })
)

export const useBeanies = (): QueryObserverResult => (
  useQuery('beanies', () => axios.get('/products/beanies'), { staleTime: 3*60*1000 })
)

//export const useAvailability = (manufacturer: string): QueryObserverResult => {
//  console.log(manufacturer)
//  return useQuery('availability', (manufacturer: string) => axios.get(`/availability/${manufacturer}`))
//}