const { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, ALL_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL, UPDATE_ORDER_RESET, DELETE_ORDER_RESET } = require("../constants/orderConstants");


exports.orderReducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state

    }
}

exports.myOrdersReducer = (state = {}, action) => {
    switch (action.type) {

        case MY_ORDER_REQUEST:
            return {
                loading: true
            }

        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state

    }
}


exports.orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case ORDER_DETAIL_REQUEST:
            return {
                loading: true
            }

        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state

    }
}

exports.allOrdersReducer = (state = {order:[]}, action) => {
    switch (action.type) {

        case ALL_ORDER_REQUEST:
            return {
                loading: true
            }

        case ALL_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ALL_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state

    }
}


exports.orderReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                loading: true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ORDER_FAIL:
            case DELETE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

         case UPDATE_ORDER_RESET:
            return {
                loading:false,
                isUpdated:false
            } 

         case DELETE_ORDER_RESET:
            return {
                loading:false,
                isDeleted:false
            }   

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state

    }
}