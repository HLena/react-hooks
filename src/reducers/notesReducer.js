import { types } from '../types/types';


const initialState = {
    notes: [],
    active: null
}
export const notesReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.noteActive:
            return {
                ...state,
                active: { 
                    ...action.payload
                }
            }
        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload]
            }
        case types.noteUpdated:
            return {
                ...state,
                notes: state.notes.map( 
                    note =>   note.id === action.payload.id
                        ?  action.payload.note
                        : note
                )
            }
        case types.noteFileUrl:
            return {
                ...state,
                active: {
                    ...state.active,
                    url: action.payload
                }
            }

        case types.notesDeleted:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
        case types.notesAddNew:
            return{
                ...state,
                notes: [action.payload, ...state.notes]
            }
        default:
            return state;
    }
}