import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';
import '@testing-library/jest-dom';


const middlewares = [thunk]
const mockStore = configureStore(middlewares)


const initState = {
    auth: {
        uid: '',
        displayName:''
    }
}

let store = mockStore(initState)

describe('Pruebas con las acciones de Auth', () => {

    beforeEach(() => {

        store = mockStore(initState)

    })
    test('login y logout deben de crear las acción respectiva', () => {

        const uid = '1234';
        const displayName = 'Elena';

        const loginAction = login(uid, displayName)
        const logoutAction = logout();

        expect(loginAction).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toEqual({ type: types.logout });
    });

    test('startLogout debe cerrar sesion', async() => {
        
        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning,
            payload: {
                active: null,
                notes: []
            }
            
        })

    });

    test('Debe iniciar el startLoginEmailPassword', async () => {
      
        await store.dispatch(startLoginEmailPassword('root@gmail.com','root123'))

        const actions = store.getActions();

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'uWOpEHfmblPpsC6Gw3mWGJjF8lZ2',
                displayName: null
            }
        });

    });

    
});

