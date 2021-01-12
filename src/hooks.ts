import axios from 'axios'
import { QueryFunction, QueryObserverOptions, QueryObserverResult, useQueries, useQuery } from 'react-query'
import { Item, QueryResult } from './types'
import { toItemList } from './utils/toItemList'


export const useGloves = (): QueryResult => {
  const hook = useQuery('gloves', () => axios.get('/products/gloves'), { staleTime: 3*60*1000 })
  return { ...hook, data: dataToItems(hook.data) }
}

export const useFacemasks = (): QueryResult => {
  const hook = useQuery('facemasks', () => axios.get('/products/facemasks'), { staleTime: 3*60*1000 })
  return { ...hook, data: dataToItems(hook.data), }
}

export const useBeanies = (): QueryResult => {
  const hook = useQuery('beanies', () => axios.get('/products/beanies'), { staleTime: 3*60*1000 })
  return { ...hook, data: dataToItems(hook.data), }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataToItems = (hookData: any): Item[] | undefined => {
  let dataAsItems
  try {
    dataAsItems = toItemList(hookData)
  } catch {
    dataAsItems = undefined
  }
  return dataAsItems
}

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
