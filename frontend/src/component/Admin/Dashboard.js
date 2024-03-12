import React, { useEffect } from 'react';
import Sidebar from './Sidebar.js';
import './Dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProductDetails } from '../../actions/productActions.js';
import { getAllOrders } from '../../actions/orderActions.js';
import { getAllUsers } from '../../actions/userActions.js';

const Dashboard = ({isAdmin}) => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {products } = useSelector(state => state.product);
    const {order} =useSelector(state=>state.allOrder)

    const { users } = useSelector(state => state.getAllUser);

  
      let outOfStock=0;

    products && 
    products.forEach((item)=>{
        if(item.stock==='0'){
            outOfStock +=1;
        }
    })

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ['tomato'],
                hoverBackgroundColor: ['rgb(197,72,49)'],
                data: [0, 4000]
            }
        ]
    };


    const dougnutState={
        labels:['OUT OF STOCK',"INSTOCK"],
        datasets:[
            {
                backgroundColor:['#00A684','#680084'],
                hoverBackgroundColor:['#4B5000','#35014F'],
                data:[outOfStock,products.length-outOfStock]
            }
        ]
    }
 
    useEffect(()=>{
       if(isAdmin!=='admin'){
        navigate('/login');
       }

        dispatch(getAdminProductDetails());

        dispatch(getAllOrders());

        dispatch(getAllUsers());

    },[isAdmin,navigate,dispatch])

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <Typography component='h1'>Dashboard</Typography>
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹2000
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to='/admin/products' >
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to='/admin/orders' >
                            <p>Orders</p>
                            <p>{order && order.length}</p>
                        </Link>
                        <Link to='/admin/users' >
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="dougnutChart">
                    <Doughnut data={dougnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
