import React, { useEffect, useState } from 'react';
import './NewProduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from '../Admin/Sidebar';
import { EmailOutlined, Spellcheck, VerifiedUser } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import { updateUser, ClearError, getUserDetail } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';
import { Button } from '@material-ui/core';

const UserUpdate = ({ isAdmin }) => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { id } = useParams();

    const { user, loading, error } = useSelector(state => state.getUserDetail);

    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    useEffect(() => {

        if (user && user._id !== id) {
            dispatch(getUserDetail(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

        }


        if (isAdmin !== 'admin') {
            navigate('/login');
        }

        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }

        if (updateError) {
            alert.error(error);
            dispatch(ClearError());
        }

        if (isUpdated) {
            alert.success('User Updated Successfully!');
            navigate('/admin/users');
            dispatch({
                type: USER_UPDATE_RESET
            })
        }

    }, [isAdmin, navigate, isUpdated, error, alert, dispatch, updateError, user, id])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(id, myForm));

    }


    return (
        <>
            <MetaData title="Update User" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> :
                        <form
                            className='createProductForm'
                            style={{
                                height: "70%",
                                marginTop: "5vmax"
                            }}
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <Spellcheck />
                                <input type="text"
                                    required
                                    placeholder='User Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <EmailOutlined />
                                <input type="email"
                                    required
                                    placeholder='User Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUser />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <Button
                                type='submit'
                                id='createProductBtn'
                                disabled={updateLoading === true ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>

                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default UserUpdate
