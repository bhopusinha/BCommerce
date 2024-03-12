import React, { useState, useEffect } from 'react';
import './ResetPassword.css'
import { LockOpen, Lock} from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, resetPassword } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';

const ResetPassword = () => {

    const navigate = useNavigate();
    const { error, success, loading } = useSelector((state) => state.forgotPassword);
    const { token } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(myForm,token));

    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }

        if (success) {
            alert.success("Password is updated successfully !");
            navigate('/login');
        }
    }, [dispatch, error, alert, navigate, success])


    return (
        <>
            {
                loading ? <Loader /> :

                    <>
                        <MetaData title="Reset Password" />
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBox">
                                <h2 className='resetPasswordHeading'>Reset Password</h2>
                                <form className="resetPasswordForm" onSubmit={resetPasswordSubmit} >

                                    <div className="resetPasswordPassword">
                                        <Lock />
                                        <input type="password"
                                            placeholder='newPassword'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="resetPasswordPassword">
                                        <LockOpen />
                                        <input type="password"
                                            placeholder='Password'
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setconfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" value="Update" className='resetPasswordBtn' />
                                </form>
                            </div>
                        </div></>
            }
        </>
    )
}

export default ResetPassword
