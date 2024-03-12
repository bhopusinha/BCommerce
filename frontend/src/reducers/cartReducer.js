import { CART_ITEM_ADD, CART_ITEM_REMOVE, SAVE_ITEM_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {

    switch (action.type) {

        case CART_ITEM_ADD:
            const item = action.payload;

            const checkItem = state.cartItems.find(
                (i) => i.product === item.product
            );

            if (checkItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        (i) => (i.product === checkItem.product ? item : i)
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_ITEM_REMOVE:

            const id = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => (i.product !== id.product))
            }

        case SAVE_ITEM_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state;
    }

}