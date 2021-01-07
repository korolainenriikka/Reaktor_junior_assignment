import { State } from './state'
import { Category, Item, AvailabilityData } from '../types'

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
      return {
        gloves: state.gloves.map(g => {
          const itemAvailability = action.payload.find(datapoint => datapoint.id.toLowerCase() === g.id)
          if (itemAvailability) {
            g.availability = itemAvailability.availability
          }
          return g
        }),
        facemasks: state.facemasks.map(f => {
          const itemAvailability = action.payload.find(datapoint => datapoint.id.toLowerCase() === f.id)
          if (itemAvailability) {
            f.availability = itemAvailability.availability
          }
          return f
        }),
        beanies: state.beanies.map(b => {
          const itemAvailability = action.payload.find(datapoint => datapoint.id.toLowerCase() === b.id)
          if (itemAvailability) {
            b.availability = itemAvailability.availability
          }
          return b
        })
      }
    default:
      return state
  }
}

export const setItems = (items: Item[], category: Category): Action => {
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
