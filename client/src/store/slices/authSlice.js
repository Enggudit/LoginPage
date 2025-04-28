import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        loading : false,
        error : null,
        message: null,
        user : null,
        isAuthenticated : false,
    },
    reducers :{
        registerRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        registerSuccess(State, action){
            State.loading = false;
            State.message = action.payload.message;
        },
        registerFail(State, action){
            State.loading = false;
            State.error = action.payload;
        },
        otpVerificationRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        otpVerificationSuccess(State, action){
            State.loading = false;
            State.message = action.payload.message;
            State.isAuthenticated = true;
            State.user = action.payload.user;
        },
        otpVerificationFail(State, action){
            State.loading = false;
            State.error = action.payload;
        },
        loginSuccess(State, action){
            State.loading = false;
            State.isAuthenticated = true;
            State.user = action.payload.user;
            State.message = action.payload.message;
            State.error = null;
        },
        loginRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        loginFail(State, action){
            State.loading = false;
            State.error = action.payload;
        },
        logoutSuccess(State, action){
            State.loading = false;
            State.isAuthenticated = false;
            State.user = null;
            State.message = action.payload;
        },
        logoutRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        logoutFail(State, action){
            State.loading = false;
            State.error = action.payload;
            State.message = null;
        },
        getUserRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        getUserSuccess(State, action){
            State.loading = false;
            State.isAuthenticated = true;
            State.user = action.payload.user;
        },
        getUserFail(State, action){
            State.loading = false;
            State.error = action.payload;
            State.isAuthenticated = false;
            State.user = null;
        },
        forgotPasswordRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        forgotPasswordSuccess(State, action){
            State.loading = false;
            State.message = action.payload;
        },
        forgotPasswordFail(State, action){
            State.loading = false;
            State.error = action.payload;
        },
        resetPasswordRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        resetPasswordSuccess(State, action){
            State.loading = false;
            State.message = action.payload.message;
            State.user= action.payload.user;
            State.isAuthenticated = true;
        },
        resetPasswordFail(State, action){
            State.loading = false;
            State.error = action.payload;
        },
        updatePasswordRequest(State){
            State.loading = true;
            State.error = null;
            State.message = null;
        },
        updatePasswordSuccess(State, action){
            State.loading = false;
            State.message = action.payload.message;
            State.user= action.payload.user;
            State.isAuthenticated = true;
        },
        updatePasswordFail(State, action){
            State.loading = false;
            State.error = action.payload;
        },
        resetAuthSlice(State){
            State.error = null;
            State.message = null;
            State.loading = false;
        }
    },
})

export const resetAuthSlice =()=> (dispatch) =>{
    dispatch(authSlice.actions.resetAuthSlice());
}

export const register = (data) => async(dispatch) => {
    try {
        dispatch(authSlice.actions.registerRequest());
        const res = await axios.post("http://localhost:4000/api/v1/auth/register", data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(authSlice.actions.registerSuccess(res.data));
    } catch (error) {
        dispatch(authSlice.actions.registerFail(error.response.data.message));
    }
};

export const otpVerification = (email, otp) => async(dispatch) =>{
    console.log(email, otp)
    dispatch(authSlice.actions.otpVerificationRequest());
    await axios.post("http://localhost:4000/api/v1/auth/verify-otp", {email, otp}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res =>{
        dispatch(authSlice.actions.otpVerificationSuccess(res.data));
    }).catch(error =>{
        dispatch(authSlice.actions.otpVerificationFail(error.response.data.message));
    })
};

export const login = (data) => async(dispatch) =>{
    dispatch(authSlice.actions.loginRequest());
    await axios.post("http://localhost:4000/api/v1/auth/login",data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res =>{
        dispatch(authSlice.actions.loginSuccess(res.data.message));
    }).catch(error =>{
        dispatch(authSlice.actions.loginFail(error.response.data.message));
    })
};

export const logout = () => async(dispatch) =>{
    dispatch(authSlice.actions.logoutRequest());
    await axios.get("http://localhost:4000/api/v1/auth/logout", {
        withCredentials: true,
    }).then(res =>{
        dispatch(authSlice.actions.logoutSuccess(res.data.message));
        dispatch(authSlice.actions.resetAuthSlice());
    }).catch(error =>{
        dispatch(authSlice.actions.logoutFail(error.response.data.message));
    })
};

export const getUser = () => async(dispatch) =>{
    dispatch(authSlice.actions.getUserRequest());
    await axios.get("http://localhost:4000/api/v1/auth/me", {
        withCredentials: true,
    }).then(res =>{
        dispatch(authSlice.actions.getUserSuccess(res.data));
        dispatch(authSlice.actions.resetAuthSlice());
    }).catch(error =>{
        dispatch(authSlice.actions.getUserFail(error.response.data.message));
    })
};

export const forgotPassword = (email) => async(dispatch) =>{
    
    dispatch(authSlice.actions.forgotPasswordRequest());
    
    await axios.post("http://localhost:4000/api/v1/auth/password/forgot",{email}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res =>{
        dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message));
    }).catch(error =>{
        dispatch(authSlice.actions.forgotPasswordFail(error.response.data.message));
    })
};

export const resetPassword = (formData, token) => async (dispatch) => {
    dispatch(authSlice.actions.resetPasswordRequest());
    await axios.put(`http://localhost:4000/api/v1/auth/password/reset/${token}`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',  // Important: multipart
      },
    }).then(res => {
      dispatch(authSlice.actions.resetPasswordSuccess(res.data.message));
    }).catch(error => {
      dispatch(authSlice.actions.resetPasswordFail(error.response.data.message));
    });
  };
  

export const updatePassword = (data) => async(dispatch) =>{
    
    dispatch(authSlice.actions.updatePasswordRequest());
    await axios.put('http://localhost:4000/api/v1/auth/password/Update',data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res =>{
        dispatch(authSlice.actions.updatePasswordSuccess(res.data));
    }).catch(error =>{
        dispatch(authSlice.actions.updatePasswordFail(error.response.data.message));
    })
};


export default authSlice.reducer;