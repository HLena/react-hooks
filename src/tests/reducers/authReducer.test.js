import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";


describe('Pruebas en el authReducer', () => {
    test('Debe de realizar el login', () => {
    
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Ele'
            }
        }

        const state = authReducer(initState, action);
        expect( state ).toEqual({
            uid: 'abc',
            displayName: 'Ele'
        })
    })

    test('Debe de realizar el logout', () => {
    
        const initState = {
            uid: 'abc',
            displayName: 'Ele'
        };
        const action = {
            type: types.logout,
        }

        const state = authReducer(initState, action);
        expect( state ).toEqual({})
    })


    test('Al realizar cualquier accion desconocida', () => {
    
        const initState = {
            uid: 'abc',
            displayName: 'Ele'
        };
        const action = {
            type: 'external',
        }

        const state = authReducer(initState, action);
        expect( state ).toEqual(initState)
    })
    
    
    
})

