import axios from 'axios'
import { QueryObserverResult, useQuery } from 'react-query'

export const useGloves = (): QueryObserverResult => (
  useQuery('gloves', () => axios.get('/products/gloves'))
)
