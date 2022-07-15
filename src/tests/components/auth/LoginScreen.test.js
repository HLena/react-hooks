import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter} from 'react-router-dom';
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))


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
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <LoginScreen/>
        </MemoryRouter>
    </Provider>
);

describe('Prebas en <LoginScreen/>', () => {

    beforeEach(() => {

        store = mockStore(initState)
        jest.clearAllMocks();

    })
    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('Debe de disparar la accion de startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled()
    });

    // test('Debe de disparar la accion de startLogin con sus respectivos argunmentos', () => {
    //     wrapper.find('form').prop('onSubmit')({
    //         preventDefault(){}
    //     });
    //     expect(startLoginEmailPassword).toHaveBeenLastCalledWith('', '');
    // });
    
    
  


});
