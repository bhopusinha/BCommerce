import React from 'react';
import './CartItemCard.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeToCart } from '../../actions/cartActions';

const CartItemCard = ({ item }) => {

  const dispatch = useDispatch();

  const removeCartItem = (id) => {
    console.log(id);
    dispatch(removeToCart(id));
  }

  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p onClick={() => removeCartItem(item.product)} >Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard
