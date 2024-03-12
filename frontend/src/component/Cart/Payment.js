import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckOutSteps from './CheckOutSteps';
import { useAlert } from 'react-alert';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css';
import { CreditCard, Event, VpnKey } from '@material-ui/icons';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { ClearError, createOrder } from '../../actions/orderActions';


const Payment = () => {


    const alert = useAlert();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const navigate = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const { error } = useSelector(state => state.newOrder);
    // const { error } = useSelector(state => state.newOrder);


    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const orders = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const SubmitHandler = async (e) => {

        e.preventDefault();

        payBtn.current.disabled = true;

        try {

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post('/api/v1/payment/process', paymentData, config);

            const client_secret = data.client_secret;
            // console.log(data);
            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country
                        }
                    }
                },
            }
            );


            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    orders.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    dispatch(createOrder(orders));

                    alert.success("payment success!")
                    navigate('/success');
                } else {
                    alert.error('there is some issue while processing payment');
                }

            }

        } catch (e) {
            payBtn.current.disabled = false;
            alert.error(e.response.data.message);
        }

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }
    }, [dispatch, alert, error])

    return (
        <>
            <MetaData title="Payment" />
            <CheckOutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => SubmitHandler(e)} >
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <Event />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKey />
                        <CardCvcElement className='paymentInput' />
                    </div>

                    <input type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className='paymentFormBtn'
                    />

                </form>
            </div>

        </>
    )
}

export default Payment
