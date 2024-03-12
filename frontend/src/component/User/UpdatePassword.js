import React, { useState, useEffect } from 'react';
import './UpdatePassword.css'
import { LockOpen, Lock, VpnKey } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, updatePassword } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';
import { PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {

    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [oldPassword, setOldPassword] = useState("");
    const [nPassword, setNewPassword] = useState("");
    const [cPassword, setcPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("password", nPassword);
        myForm.set("confirmPassword", cPassword);
        dispatch(updatePassword(myForm));

    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }
           console.log(isUpdated);
        if (isUpdated) {
            alert.success("Password is updated successfully !");
            navigate('/account');

            dispatch({ type: PASSWORD_RESET });
        }
    }, [dispatch, error, alert, navigate, isUpdated])


    return (
        <>
            {
                loading ? <Loader /> :

                    <>
                        <MetaData title="Update Password" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordBox">
                                <h2 className='updatePasswordHeading'>Update Password</h2>
                                <form className="updatePasswordForm" onSubmit={updatePasswordSubmit} >
                                    <div className="updatePasswordPassword">
                                        <VpnKey />
                                        <input type="password"
                                            placeholder='oldPassword'
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="updatePasswordPassword">
                                        <Lock />
                                        <input type="password"
                                            placeholder='newPassword'
                                            required
                                            value={nPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="updatePasswordPassword">
                                        <LockOpen />
                                        <input type="password"
                                            placeholder='Password'
                                            required
                                            value={cPassword}
                                            onChange={(e) => setcPassword(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" value="Update" className='updatePasswordBtn' />
                                </form>
                            </div>
                        </div></>
            }
        </>
    )
}

export default UpdatePassword
