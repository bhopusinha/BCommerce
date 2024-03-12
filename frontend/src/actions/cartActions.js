import { CART_ITEM_ADD, CART_ITEM_REMOVE, SAVE_ITEM_INFO } from "../constants/cartConstants";
import axios from 'axios';

export const addToCart = (id, quantity) => async (dispatch, getItem) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: CART_ITEM_ADD,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            stock:data.product.stock,
            image: data.product.images[0].url,
            quantity
        }
    })

    localStorage.setItem("cartItem", JSON.stringify(getItem().cart.cartItems));

}


export const removeToCart = (id) => async (dispatch, getItem) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: CART_ITEM_REMOVE,
        payload: {
            product: data.product._id
        }
    })

    localStorage.setItem("cartItem", JSON.stringify(getItem().cart.cartItems));

}

export const saveShippingInfo=(data)=>async(dispatch)=>{

    dispatch({
        type:SAVE_ITEM_INFO,
        payload:data
    })
    
  localStorage.setItem('shippingInfo',JSON.stringify(data));  
}