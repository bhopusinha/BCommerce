import React, { useState, useEffect } from 'react';
import './ForgotPassword.css'
import { MailOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, forgotPassword } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';


const ForgotPassword = () => {

    const navigate = useNavigate();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }

        if (message) {
            alert.success(message);
        }

    }, [dispatch, error, alert, navigate, message])


    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <MetaData title="Forgot Password" />
                        <div className="forgotPasswordContainer">
                            <div className="forgotPasswordBox">
                                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                                <form className="forgotPasswordForm"
                                    onSubmit={forgotPasswordSubmit}
                                >
                                    <div className="forgotPasswordEmail">
                                        <MailOutlined />
                                        <input type="email"
                                            required
                                            value={email}
                                            placeholder='Email'
                                            name='email'
                                            onChange={(e) => (setEmail(e.target.value))}
                                        />
                                    </div>

                                    <input type="submit" value='Send' className='forgotPasswordBtn' />
                                </form>
                            </div>
                        </div></>
            }
        </>

    )
}

export default ForgotPassword
