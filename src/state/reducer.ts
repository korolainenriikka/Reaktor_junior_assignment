import { State } from './state'
import { Item } from '../types'

export type Action =
  {
    type: "SET_JACKETS_LIST";
    payload: Item[];
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_JACKETS_LIST":
      return {
        ...state
      }
    
    default:
      return state
  }
}


/*
action creators....

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList
  }
}
*/

