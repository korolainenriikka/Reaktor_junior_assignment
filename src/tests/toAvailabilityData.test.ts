/* eslint-disable @typescript-eslint/no-unsafe-call */
import { axiosResToAvailabilityData } from '../utils/toAvailabilityData'

/*
 - jos ei löydy response.data.response joka on array -> throw error unexpected response format
 - 
*/

test('hello', () => {
  expect(1).toBe(1)
})

test('response without property data.response throws error', () => {
  const invalidReponse = {
    data: {
      status: 404
    }
  }

  expect(() => axiosResToAvailabilityData(invalidReponse))
    .toThrow('unexpected response format')
})
