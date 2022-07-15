import Swal from 'sweetalert2';

import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    googleAuthProvider,
    signInWithPopup,
    signOut
} from '../firebase/firebase-config';

import { types } from '../types/types';
import { logoutCleaning } from './notes';
import { startLoading, finishLoading } from './ui';


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
        const auth = getAuth();
        return signInWithEmailAndPassword( auth, email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));

                dispatch( finishLoading() );
            })
            .catch( e => {
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

        
        
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password )
            .then( async({ user }) => {

                // await user.updateProfile({ displayName: name });
                dispatch(
                    login( user.uid, user.displayName )
                );
            })
            .catch( e => {
                Swal.fire('Error', e.message, 'error');
            })

    }
}



export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });

    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch( logout() );
        dispatch(logoutCleaning());
    }
}


export const logout = () => ({
    type: types.logout
})


