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
import { deleteUser, getAllUsers,ClearError } from '../../actions/userActions';
import { USER_DELETE_RESET } from '../../constants/userConstants';

const UserList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const { error, users } = useSelector(state => state.getAllUser);
    const { error: deleteError, isDeleted,message } = useSelector(state => state.profile)


    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }


    const columns = [
        { field: "id", headerName: "User Id", minWidth: 200, flex: 0.5 },
        { field: "email", headerName: "Email", minWidth: 300, flex: 0.7 },
        { field: "name", headerName: "name", minWidth: 150, type: 'number', flex: 0.3 },
        { field: "role", headerName: "Role", minWidth: 270,type:"number", flex: 0.5,
        cellClassName:(params)=>{
            return params.getValue(params.id,"role") === 'admin'?'greenColor':'redColor';
        } 
       
    },
        {
            field: "actions", headerName: "Actions", minWidth: 150, type: 'number', flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`} >
                            <Edit />
                        </Link>

                        <Button onClick={()=>deleteUserHandler(params.getValue(params.id, "id"))} >
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
            alert.success(message);
            navigate('/admin/users');
            dispatch({ type: USER_DELETE_RESET })
        }

        dispatch(getAllUsers());
    }, [error, dispatch, alert,isDeleted,deleteError,navigate,message])


    const rows = [];

    users &&
       users.forEach((item) => {
            rows.push({
                id: item._id,
                email: item.email,
                name: item.name,
                role: item.role
            })
        });

    return (
        <>
            <MetaData title='ALL USERS - admin' />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

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

export default UserList;
