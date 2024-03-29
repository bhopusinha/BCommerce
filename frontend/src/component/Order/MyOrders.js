import React, { useEffect } from 'react';
import './MyOrders.css';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { ClearError, myOrders } from '../../actions/orderActions';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import {Launch} from '@material-ui/icons';
import {Link} from 'react-router-dom';

const MyOrders = () => {


    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, orders } = useSelector(state => state.myOrders);
    const { user } = useSelector(state => state.user);

    const columns = [
       {field:"id" , headerName:"Order ID" , minWidth:250,flex:0.7} , 
       {field:"status" , headerName:"Status" , minWidth:150,flex:0.5,
       cellClassName:(params)=>{
        return params.getValue(params.id,"status")==="Delivered" ? 'greenColor':'redColor'
       }
    },  
       {field:"itemsQty" , headerName:"Items Qty",type:"number", minWidth:150,flex:0.3} , 
       {field:"amount" , headerName:"Amount",type:"number", minWidth:270,flex:0.5},
       {field:"actions" , headerName:"Actions",type:"number", minWidth:150,flex:0.3,sortable:false,

       renderCell:(params)=>{
        return (<Link to={`/order/${params.getValue(params.id,"id")}`} >
            <Launch/>
        </Link>)
       }
    
    },

    ];

    const rows = [];

    orders && 
       orders.forEach((item,index)=>{
          rows.push({
            itemsQty:item.orderItems.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice

          })
       });


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }

        dispatch(myOrders());

    }, [dispatch, alert, error]);


    return (
        <>
            <MetaData title={`${user.name} - Orders`} />

            {
                loading ? <Loader /> :
                    (
                        <div className="myOrdersPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className='myOrdersTable'
                                autoHeight
                            />
                            <Typography id="myOrdersHeading" >{user.name}`s Orders</Typography>
                        </div>

                    )
            }
        </>
    )
}

export default MyOrders
