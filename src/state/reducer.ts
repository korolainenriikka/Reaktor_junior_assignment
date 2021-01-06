import { State } from './state'
import { category, Item, AvailabilityData } from '../types'

export type Action =
  | {
    type: "SET_GLOVES_LIST";
    payload: Item[];
  }
  | {
    type: "SET_FACEMASKS_LIST";
    payload: Item[];
  }
  | {
    type: "SET_BEANIES_LIST";
    payload: Item[];
  }
  | {
    type: "UPDATE_AVAILABILITY_DATA";
    payload: AvailabilityData[];
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_GLOVES_LIST":
      return {
        ...state,
        gloves: action.payload
      }
    case "SET_FACEMASKS_LIST":
      return {
        ...state,
        facemasks: action.payload
      }
    case "SET_BEANIES_LIST":
      return {
        ...state,
        beanies: action.payload
      }
    case "UPDATE_AVAILABILITY_DATA":
      console.log(action.payload)
      console.log(state)
      /*return {
        jackets: state.jackets.map(j => {
          const itemAvailability = action.payload.find(datapoint => datapoint.id === j.id)
          if (itemAvailability) {
            console.log('found item!')
            j.availability = itemAvailability.availability
          }
          return j
        }),
        shirts: state.shirts.map(s => {
          const itemAvailability = action.payload.find(datapoint => datapoint.id === s.id)
          if (itemAvailability) {
            s.availability = itemAvailability.availability
          }
          return s
        }),
        accessories: state.accessories.map(a => {
          const itemAvailability = action.payload.find(datapoint => datapoint.id === a.id)
          if (itemAvailability) {
            a.availability = itemAvailability.availability
          }
          return a
        })
      }*/
      return state
    default:
      return state
  }
}

export const setItems = (items: Item[], category: category): Action => {
  switch (category){
    case 'gloves':
      return {
        type: 'SET_GLOVES_LIST',
        payload: items
      }
    case 'facemasks':
      return {
        type: 'SET_FACEMASKS_LIST',
        payload: items
      }
    default:
      return {
        type: 'SET_BEANIES_LIST',
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
