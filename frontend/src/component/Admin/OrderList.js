import { Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import './AdminProducts.css';
import { deleteOrder, getAllOrders ,ClearError } from '../../actions/orderActions';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrderList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, order } = useSelector(state => state.allOrder);
  const { error: deleteError, isDeleted } = useSelector(state => state.orderReducer)


  const deleteProductHandler = (id) => {
    dispatch(deleteOrder(id));
  }


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 0.7 },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered" ? 'greenColor' : 'redColor'
      }
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.4 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", minWidth: 150, type: 'number', flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`} >
              <Edit />
            </Link>

            <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))} >
              <Delete />
            </Button>
          </>
        )
      }
    },
  ]

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (deleteError) {
        alert.error(deleteError);
    }

    if (isDeleted) {
        alert.success('order is Deleted Successfully!');
        navigate('/admin/orders');
        dispatch({ type: DELETE_ORDER_RESET })
    }

    dispatch(getAllOrders());
  }, [error, dispatch, alert, isDeleted, deleteError, navigate])


  const rows = [];

  order &&
    order.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        itemsQty: item.orderItems.length
      })
    });

  return (
    <>
      <MetaData title='ALL PRODUCTS - admin' />
      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            pageSize={10}
            className='productListTable'
            autoHeight
          />

        </div>
      </div>
    </>
  )
}


export default OrderList
