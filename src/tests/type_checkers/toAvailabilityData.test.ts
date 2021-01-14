/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Availability } from '../../types'
import { resToAvailabilityData } from '../../type_checkers/toAvailabilityData'

test('response without property data.response throws error', () => {
  const invalidResponse = {
    data: {
      status: 404
    }
  }

  expect(() => resToAvailabilityData(invalidResponse))
    .toThrow('unexpected response format')
})

test('response with non-array data.response throws error', () => {
  const invalidResponse = {
    data: {
      status: 200,
      response: 'all good'
    }
  }

  expect(() => resToAvailabilityData(invalidResponse))
    .toThrow('unexpected response format')
})

const validDataPayload = '<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>'
const validId = '30D2D9F3851621D5A3CD9'
const validId2 = '30D2D9F3851621D5A3CE7'

const formResponseObject = (data: any[]) => {
  return {
    data: {
      status: 200,
      response: data
    }
  }
}

test('availability data item without id throws error', () => {
  const invalidItem = {
    DATAPAYLOAD: validDataPayload
  }
  const validFormatResponseWithOneInvalidItem = formResponseObject([invalidItem])
  expect(() => resToAvailabilityData(validFormatResponseWithOneInvalidItem))
    .toThrow('Incorrect or missing id: undefined')
})

test('availability data item with non-string id throws error', () => {
  const invalidItem = {
    id: 123,
    DATAPAYLOAD: validDataPayload
  }
  const validFormatResponseWithOneInvalidItem = formResponseObject([invalidItem])
  expect(() => resToAvailabilityData(validFormatResponseWithOneInvalidItem))
    .toThrow('Incorrect or missing id: 123')
})

test('availability data item without data payload throws error', () => {
  const invalidItem = {
    id: validId
  }
  const validFormatResponseWithOneInvalidItem = formResponseObject([invalidItem])
  expect(() => resToAvailabilityData(validFormatResponseWithOneInvalidItem))
    .toThrow('Missing availability data or unexpected format: undefined')
})

test('availability data item with data payload not in xml throws error', () => {
  const invalidItem = {
    id: validId,
    DATAPAYLOAD: 'available!'
  }
  const validFormatResponseWithOneInvalidItem = formResponseObject([invalidItem])
  expect(() => resToAvailabilityData(validFormatResponseWithOneInvalidItem))
    .toThrow('Missing availability data or unexpected format: available!')
})

test('availability data item with data payload in xml but with wrong attributes throws error', () => {
  const invalidItem = {
    id: validId,
    DATAPAYLOAD: '<NONVALIDBUTXML><SOMETHING>laabalaa</SOMETHING></NONVALIDBUTXML>'
  }
  const validFormatResponseWithOneInvalidItem = formResponseObject([invalidItem])
  expect(() => resToAvailabilityData(validFormatResponseWithOneInvalidItem))
    .toThrow('Missing availability data or unexpected format: <NONVALIDBUTXML><SOMETHING>laabalaa</SOMETHING></NONVALIDBUTXML>')
})

test('response array with one invalid item throws error', () => {
  const dataWithOneInvalid = [
    {
      id: validId,
      DATAPAYLOAD: validDataPayload
    },
    {
      id: validId2
    }
  ]
  const validFormatResponseWithOneInvalidItem = formResponseObject(dataWithOneInvalid)
  expect(() => resToAvailabilityData(validFormatResponseWithOneInvalidItem))
    .toThrow('Missing availability data or unexpected format: undefined')
})

test('valid response array returns array of type availabilityData', () => {
  const validData = [
    {
      id: validId,
      DATAPAYLOAD: validDataPayload
    },
    {
      id: validId2,
      DATAPAYLOAD: validDataPayload
    }
  ]
  const validResponse = formResponseObject(validData)
  const availabilityData = resToAvailabilityData(validResponse)
  expect(availabilityData.length).toBe(2)
  availabilityData.forEach(item => {
    expect(item.id === validId || item.id === validId2).toBe(true)
    expect(item.availability).toBe(Availability.InStock)
  })
})
