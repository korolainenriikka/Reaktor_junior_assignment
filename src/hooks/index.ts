/* eslint-disable @typescript-eslint/no-unused-vars */ /**poista tää ku hookit valmiit */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import { AvailabilityData, Item, ProductHook, QueryResult } from '../types'
import { dataToAvailabilities, dataToItems, fetchAvailabilityData, findManufacturers } from './hookutils'

export const useProducts = (): ProductHook => {
  const { data: glovesData,
          isLoading: isLoadingGloves,
          isFetching: isFetchingGloves,
          isError: isErrorGloves } = useGloves()
  const { data: facemasksData,
          isLoading: isLoadingFacemasks,
          isFetching: isFetchingFacemasks,
          isError: isErrorFacemasks } = useFacemasks()
  const { data: beaniesData,
          isLoading: isLoadingBeanies,
          isFetching: isFetchingBeanies,
          isError: isErrorBeanies } = useBeanies()

  const [gloves, setGloves] = useState<Item[]>([])
  const [facemasks, setFacemasks] = useState<Item[]>([])
  const [beanies, setBeanies] = useState<Item[]>([])

  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>([])
  const [availabilityUpdated, setAvailabilityUpdated] = useState<boolean>(false)

  console.log(availabilityData)

  useEffect(() => {
    const isLoading = isLoadingGloves || isLoadingFacemasks || isLoadingBeanies

    if (!isLoading && !availabilityUpdated) {
      setGloves(glovesData)
      setFacemasks(facemasksData)
      setBeanies(beaniesData)
      setAvailabilityData([])

      const manufacturers = findManufacturers(glovesData, facemasksData, beaniesData)
      manufacturers.forEach(m => {
        fetchAvailabilityData(m)
          .then(res => {
            const data = dataToAvailabilities(res)
            setAvailabilityData(availabilityData.concat(data))
          })
          .catch(e => {
            //later: refetch on err?
            console.error(e)
          })
      })
      setAvailabilityUpdated(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glovesData, facemasksData, beaniesData])

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
