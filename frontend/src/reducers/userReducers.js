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
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_RESET,
    PASSWORD_REQUEST,
    PASSWORD_SUCCESS,
    PASSWORD_FAIL,
    PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    ALL_USER_REQUEST,
    ALL_USER_FAIL,
    ALL_USER_SUCCESS,
    USER_DETAIL_REQUEST,
    USER_DETAIL_FAIL,
    USER_DETAIL_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_DELETE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
    USER_UPDATE_RESET,
    USER_DELETE_RESET
} from '../constants/userConstants';
import { CLEAR_ERRORS } from '../constants/productConstants';


export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case Login_FAIL:
        case REGISTER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            };

        case LOAD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: null
            };

        case Login_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_REQUEST:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case Login_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case LOAD_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;

    }
}


export const getAllUsersDetail = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST:
            return {
                ...state,
                loading: false,
            };

        case ALL_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;

    }
}

export const getUserDetail = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {
                ...state,
                loading: false,
            };

        case USER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case USER_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;

    }
}


export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
        case PASSWORD_REQUEST:
        case USER_UPDATE_REQUEST:
        case USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case PROFILE_SUCCESS:
        case PASSWORD_SUCCESS:
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                message:action.payload.message,
                isDeleted: action.payload.success
            };

        case PROFILE_FAIL:
        case PASSWORD_FAIL:
        case USER_UPDATE_FAIL:
        case USER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case PROFILE_RESET:
        case PASSWORD_RESET:
            case USER_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case USER_DELETE_RESET:
            return {
                ...state,
                isDeleted:false
            }    

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;

    }
}


export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            };

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;

    }
}