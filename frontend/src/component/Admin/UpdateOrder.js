import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UpdateOrder.css';
import MetaData from '../layout/MetaData';
import { Button, Typography } from '@material-ui/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ClearError, orderDetails, updateOrder } from '../../actions/orderActions';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { AccountTree } from '@material-ui/icons';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';


const UpdateOrder = ({ isAdmin }) => {
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector(state => state.orderReducer);

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const [status, setStatus] = useState("");

    const { id } = useParams();

    const updateProcessStatus = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    }

    useEffect(() => {

        if (isAdmin !== 'admin') {
            navigate('/login');
        }

        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(ClearError());
        }

        if (isUpdated) {
            alert.success("order is Updated successfully !");
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(orderDetails(id));
    }, [isAdmin, error, alert, dispatch, id, isUpdated, updateError, navigate])

    return (
        <>
            <MetaData title="Process Order" />
            <div className="dashboard" >
                <Sidebar />
                <div className="newProductContainer" >
                    {loading ? <Loader /> :
                        <div className="confirmOrderPage" style={{
                            display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
                            height: "100%"
                        }} >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneCode}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>{order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={
                                                order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'greenColor' : 'redColor'
                                            }>
                                                {
                                                    order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{
                                                order.totalPrice && order.totalPrice
                                            }</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus && order.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'
                                                }
                                            >
                                                {
                                                    order.orderStatus && order.orderStatus
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="confirmCartItems" >
                                        <Typography>Your Cart Items</Typography>
                                        <div className="confirmCartItemsContainer">
                                            {
                                                order.orderItems &&
                                                order.orderItems.map((item) => (
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
                            <div
                                style={{
                                    display: order.orderStatus === 'Delivered' ? 'none' : 'block'
                                }}
                            >
                                <form
                                    className='updateOrderForm'
                                    onSubmit={updateProcessStatus}
                                >
                                    <h1 >Process Order</h1>

                                    <div>
                                        <AccountTree />
                                        <select value={status} onChange={(e) => (setStatus(e.target.value))} >
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Proccessing" && <option value="Shipped">Shipped</option>}
                                            {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                                        </select>
                                    </div>

                                    <Button
                                        type='submit'
                                        id='updateOrderBtn'
                                        disabled={loading === true ? true : false || status === "" ? true : false}
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}


export default UpdateOrder
