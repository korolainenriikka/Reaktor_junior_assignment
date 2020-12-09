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
