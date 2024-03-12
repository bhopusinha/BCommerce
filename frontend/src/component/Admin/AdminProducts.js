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
import { ClearError, deleteProduct, getAdminProductDetails } from '../../actions/productActions';
import './AdminProducts.css';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const AdminProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const { error, products } = useSelector(state => state.product);
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteProduct)


    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }


    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 300, flex: 0.7 },
        { field: "stock", headerName: "Stock", minWidth: 150, type: 'number', flex: 0.3 },
        { field: "price", headerName: "Price", minWidth: 270, type: 'number', flex: 0.5 },
        {
            field: "actions", headerName: "Actions", minWidth: 150, type: 'number', flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} >
                            <Edit />
                        </Link>

                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))} >
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
            alert.success('product is Deleted Successfully!');
            navigate('/admin/dashboard');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

        dispatch(getAdminProductDetails());
    }, [error, dispatch, alert,isDeleted,deleteError,navigate])


    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name
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

export default AdminProducts;
