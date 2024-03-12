import axios from 'axios';
import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from '../constants/orderConstants';


export const createOrder = (order) => async (dispatch) => {

    try {

        dispatch({
            type: CREATE_ORDER_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post('/api/v1/order/new', order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: e.response.data.message
        })
    }

}

export const updateOrder = (id,order) => async (dispatch) => {

    try {

        dispatch({
            type: UPDATE_ORDER_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`,order,config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: e.response.data.message
        })
    }

}

export const deleteOrder = (id) => async (dispatch) => {

    try {

        dispatch({
            type: DELETE_ORDER_REQUEST,
        })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (e) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: e.response.data.message
        })
    }

}


export const myOrders = () => async (dispatch) => {

    try {

        dispatch({
            type: MY_ORDER_REQUEST,
        })


        const { data } = await axios.get('/api/v1/orders/me');

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (e) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: e.response.data.message
        })
    }

}


export const orderDetails = (id) => async (dispatch) => {

    try {

        dispatch({
            type: ORDER_DETAIL_REQUEST,
        })


        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data.order
        })

    } catch (e) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: e.response.data.message
        })
    }

}

export const getAllOrders = () => async (dispatch) => {

    try {

        dispatch({
            type: ALL_ORDER_REQUEST,
        })


        const { data } = await axios.get(`/api/v1/admin/orders`);

        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (e) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: e.response.data.message
        })
    }

}

export const ClearError = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}