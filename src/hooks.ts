import axios from 'axios'
import { QueryFunction, QueryObserverOptions, QueryObserverResult, useQueries, useQuery } from 'react-query'

export const useGloves = (): QueryObserverResult => (
  useQuery('gloves', () => axios.get('/products/gloves'), { staleTime: 3*60*1000 })
)

export const useFacemasks = (): QueryObserverResult => (
  useQuery('facemasks', () => axios.get('/products/facemasks'), { staleTime: 3*60*1000 })
)

export const useBeanies = (): QueryObserverResult => (
  useQuery('beanies', () => axios.get('/products/beanies'), { staleTime: 3*60*1000 })
)

export const useAvailability = (manufacturers: string[]): QueryObserverResult[] => {
  const queries: QueryObserverOptions[] = []
  manufacturers.forEach(m => {
    queries.push({ queryKey: `availability: ${m}`, queryFn: fetchAvailabilityData(m), staleTime: 3*60*1000 })
  })
  return useQueries(queries)
}

const fetchAvailabilityData = (manufacturer: string): QueryFunction<unknown> => (
  () => axios.get(`/availability/${manufacturer}`)
)
