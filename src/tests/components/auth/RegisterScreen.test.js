import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from '../../../types/types';




const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui:{
        loading: false,
        msgError: null
    }
}

let store = mockStore(initState);
// store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <RegisterScreen/>
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <RegisterScreen/>', () => {

    beforeEach(() => {

        store = mockStore(initState)
        jest.clearAllMocks();

    });

    test('Debe montarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()

        
    });

    test('debe hacer el dispatch de la funcion respectiva', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        console.log(actions)
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        })
    });

  
});
