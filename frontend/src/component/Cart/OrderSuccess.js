import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import {CheckCircle} from '@material-ui/icons';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
   <div className="orderSuccess">
    <CheckCircle/>

    <Typography>Your Order has been Placed!</Typography>
    <Link to='/orders' >View Orders</Link>
   </div>
  )
}

export default OrderSuccess
 