import axios from 'axios';

import * as actionTypes from './actions';

const authSuccess = (token, userId)=> {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

const authFail = (error)=> {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const authCheckTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = ( email, password, isSignUp ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = process.env.REACT_APP_GOOGLE_AUTH_API_SIGNUP + process.env.REACT_APP_GOOGLE_API_KEY;
        if(!isSignUp){
            url = process.env.REACT_APP_GOOGLE_AUTH_API_SIGNIN + process.env.REACT_APP_GOOGLE_API_KEY;
        }
        axios.post(url, authData)
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(authCheckTimeOut(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}