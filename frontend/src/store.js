import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { deleteReviewReducer, getAllReviewReducers, newProductReducers, productDeleteReducers, productDetailReducers, productReducers,productReviewReducers } from './reducers/productReducres';
import { forgotPasswordReducer, getAllUsersDetail, getUserDetail, profileReducer, userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    product: productReducers,
    productDetailReducers: productDetailReducers,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReviewReducer:productReviewReducers,
    newProduct:newProductReducers,
    deleteProduct:productDeleteReducers,
    allOrder:allOrdersReducer,
    orderReducer:orderReducer,
    getAllUser:getAllUsersDetail,
    getUserDetail:getUserDetail,
    productReview : getAllReviewReducers,
    deleteReview:deleteReviewReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItem") ?
            JSON.parse(localStorage.getItem("cartItem")) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ?
            JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;