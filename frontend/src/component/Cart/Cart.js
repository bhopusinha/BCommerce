import React from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard.js';
import { RemoveShoppingCart } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions.js';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(state => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        console.log(id);
        dispatch(addToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }

        dispatch(addToCart(id, newQty));
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=shipping');
    }


    return (
        <>
            {
                cartItems.length === 0 ? (
                    <div className="emptyCart">
                        <RemoveShoppingCart />
                        <Typography>No Product in Your Cart</Typography>
                        <Link to='/products' >View Products</Link>
                    </div>
                ) :
                    <>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>

                            {
                                cartItems && cartItems.map((item) => (
                                    <div className="cartContainer" key={item.product}>
                                        <CartItemCard item={item} />
                                        <div className="cartInput">
                                            <button onClick={() => decreaseQuantity(item.product, item.quantity)} >-</button>
                                            <input type="number" value={item.quantity} readOnly />
                                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} >+</button>
                                        </div>
                                        <p className="cartSubtotal">{`₹${item.quantity * item.price}`}</p>
                                    </div>
                                ))
                            }

                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkOutHandler} >Check Out</button>
                                </div>
                            </div>

                        </div>
                    </>
            }
        </>
    )
}

export default Cart
