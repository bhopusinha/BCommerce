import React from 'react';
import {useSelector} from 'react-redux';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import {Link, useNavigate} from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
    const {shippingInfo,cartItems}=useSelector(state=>state.cart);
    const {user} =useSelector(state=>state.user);

    const navigate=useNavigate();

    const subtotal=cartItems.reduce((acc,item)=>acc + item.quantity * item.price , 0);
    
    const shippingCharges=subtotal>1000 ? 0:200;

    const tax=(subtotal * 0.18);

    const totalPrice=tax + subtotal + shippingCharges;

    const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`

    const processToPayment=()=>{
        const data={
             subtotal,
             shippingCharges,
             tax,
             totalPrice,
        }

        sessionStorage.setItem('orderInfo',JSON.stringify(data));

        navigate('/process/payment');
    }

  return (
   <>
     <MetaData title='Confirm Order' />
     <CheckOutSteps activeStep={1} />
     <div className="confirmOrderPage">
        <div>
            <div className="confirmshippingArea">
               <Typography>Shipping Info</Typography>
               <div className="confirmshippingAreaBox">
                   <div>
                    <p>Name:</p>
                    <span>{user.name}</span>
                   </div>
                   <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneCode}</span>
                   </div>
                   <div>
                    <p>Address:</p>
                    <span>{address}</span>
                   </div>
               </div>

               <div className="confirmCartItems">
                <Typography>Your Cart Items</Typography>
                <div className="confirmCartItemsContainer">
                    {
                        cartItems &&
                        cartItems.map((item)=>(
                            <div key={item.product} >
                             <img src={item.image} alt="Product" />
                             <Link to={`/product/${item.product}`} >{item.name}</Link>
                             {" "}
                             <span>
                                {item.quantity} ✖ ₹{item.price}={" "}
                                <b>{item.price * item.quantity}</b>
                             </span>
                            </div>
                        ))
                    }
                </div>
               </div>
            </div>
        </div>
        <div>
            <div className="orderSummary">
                 <Typography>Order Summary</Typography>
                 <div>
                    <div>
                        <p>Subtotal:</p>
                        <span>₹{subtotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges:</p>
                        <span>₹{shippingCharges}</span>
                    </div>
                    <div>
                        <p>GST:</p>
                        <span>₹{tax}</span>
                    </div>
                 </div>

                 <div className="orderSummaryTotal">
                    <p>
                        <b>Total:</b>
                    </p>
                    <span>₹{totalPrice}</span>
                 </div>

                 <button onClick={processToPayment} >Proceed To Payment</button>
            </div>
        </div>
     </div>
   </>
  )
}

export default ConfirmOrder
