import {
    Login_FAIL,
    Login_REQUEST,
    Login_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOAD_FAIL,
    LOAD_REQUEST,
    LOAD_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAIL,
    PASSWORD_REQUEST,
    PASSWORD_SUCCESS,
    PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
} from "../constants/userConstants";
import { CLEAR_ERRORS } from "../constants/productConstants";

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: Login_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };


        const { data } = await axios.post('/api/v1/login',
            { email, password },
            config
        )
        dispatch({
            type: Login_SUCCESS,
            payload: data.user
        });

    } catch (e) {
        dispatch({
            type: Login_FAIL,
            payload: e.response.data.message
        })
    }

}

export const register = (optionData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        const { data } = await axios.post('/api/v1/register', optionData, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        });

    } catch (e) {
        dispatch({
            type: REGISTER_FAIL,
            payload: e.response.data.message
        })
    }

}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_REQUEST });

        const { data } = await axios.get('/api/v1/me');

        dispatch({
            type: LOAD_SUCCESS,
            payload: data.user
        });

    } catch (e) {
        dispatch({
            type: LOAD_FAIL,
            payload: e.response.data.message
        })
    }

}

export const logOut = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout');

        dispatch({
            type: LOGOUT_SUCCESS
        });
    } catch (e) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: e.response.data.message
        })
    }
}

export const updateProfile = (optionData) => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_REQUEST });

        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        const { data } = await axios.put('/api/v1/me/update', optionData, config);

        dispatch({
            type: PROFILE_SUCCESS,
            payload: data.success
        });

    } catch (e) {
        dispatch({
            type: PROFILE_FAIL,
            payload: e.response.data.message
        })
    }

}

export const updatePassword = (optionData) => async (dispatch) => {
    try {
        dispatch({ type: PASSWORD_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.put('/api/v1/password/update', optionData, config);

        dispatch({
            type: PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (e) {
        dispatch({
            type: PASSWORD_FAIL,
            payload: e.response.data.message
        })
    }

}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post('/api/v1/password/forget', email, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        });

    } catch (e) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload: e.response.data.message
        })
    }

}

export const resetPassword = (option,token) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, option, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (e) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload: e.response.data.message
        })
    }

}


export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type:ALL_USER_REQUEST });

        const { data } = await axios.get('/api/v1/admin/users');

        dispatch({
            type: ALL_USER_SUCCESS,
            payload: data.user
        });

    } catch (e) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: e.response.data.message
        })
    }
}

export const getUserDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type:USER_DETAIL_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data.user
        });

    } catch (e) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: e.response.data.message
        })
    }
}

export const updateUser = (id,userData) => async (dispatch) => {
    try {
        dispatch({ type:USER_UPDATE_REQUEST });

          const config={
            headers:{
                "Content-Type" : "application/json"
            }
          }

        const { data } = await axios.put(`/api/v1/admin/user/${id}`,userData,config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data.success
        });

    } catch (e) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: e.response.data.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type:USER_DELETE_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });

    } catch (e) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: e.response.data.message
        })
    }
}

export const ClearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}