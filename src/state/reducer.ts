import { State } from './state'
import { category, Item, AvailabilityData } from '../types'

export type Action =
  | {
    type: "SET_JACKETS_LIST";
    payload: Item[];
  }
  | {
    type: "SET_SHIRTS_LIST";
    payload: Item[];
  }
  | {
    type: "SET_ACCESSORIES_LIST";
    payload: Item[];
  }
  | {
    type: "UPDATE_AVAILABILITY_DATA";
    payload: AvailabilityData[];
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_JACKETS_LIST":
      return {
        ...state,
        jackets: action.payload
      }
    case "SET_SHIRTS_LIST":
      return {
        ...state,
        shirts: action.payload
      }
    case "SET_ACCESSORIES_LIST":
      return {
        ...state,
        accessories: action.payload
      }
    case "UPDATE_AVAILABILITY_DATA":
      return {
        jackets: state.jackets.map(j => {
          const itemAvailability = action.payload.filter(datapoint => datapoint.id === j.id)
          if (itemAvailability) {
            j.availability = itemAvailability[0].availability
          }
          return j
        }),
        shirts: state.shirts.map(s => {
          const itemAvailability = action.payload.filter(datapoint => datapoint.id === s.id)
          if (itemAvailability) {
            s.availability = itemAvailability[0].availability
          }
          return s
        }),
        accessories: state.accessories.map(a => {
          const itemAvailability = action.payload.filter(datapoint => datapoint.id === a.id)
          if (itemAvailability) {
            a.availability = itemAvailability[0].availability
          }
          return a
        })
      }
    default:
      return state
  }
}

export const setItems = (items: Item[], category: category): Action => {
  switch (category){
    case 'jackets':
      return {
        type: 'SET_JACKETS_LIST',
        payload: items
      }
    case 'shirts':
      return {
        type: 'SET_SHIRTS_LIST',
        payload: items
      }
    case 'accessories':
      return {
        type: 'SET_ACCESSORIES_LIST',
        payload: items
      }
    default:
      return {
        type: 'SET_JACKETS_LIST',
        payload: items
      }
  }
}

export const updateAvailability = (data: AvailabilityData[]): Action => {
  return {
    type: "UPDATE_AVAILABILITY_DATA",
    payload: data
  }
}
