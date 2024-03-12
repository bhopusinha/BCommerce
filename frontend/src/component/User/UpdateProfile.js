import React, { useState, useEffect } from 'react';
import './UpdateProfile.css'
import { Face, MailOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, loadUser, updateProfile } from '../../actions/userActions';
import Loader from '../layout/Loader/Loader';
import { PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const alert = useAlert();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('/Profile.png');


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));

    }


    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatar(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }

        if (isUpdated) {
            alert.success("profile is updated successfully !");
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: PROFILE_RESET });
        }
    }, [dispatch, error, alert, navigate, isUpdated, user])


    return (
        <>
            {
                loading ? <Loader /> :

                    <>
                        <MetaData title="Update Profile" />
                        <div className="updateProfileContainer">
                            <div className="updateProfileBox">
                                <h2 className='updateProfileHeading'>Update Profile</h2>
                                <form className="updateProfileForm"
                                    encType='multipart/form-data'
                                    onSubmit={updateProfileSubmit}
                                >
                                    <div className="updateProfileName">
                                        <Face />
                                        <input type="text"
                                            required
                                            value={name}
                                            placeholder='Name'
                                            name='name'
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="updateProfileEmail">
                                        <MailOutlined />
                                        <input type="email"
                                            required
                                            value={email}
                                            placeholder='Email'
                                            name='email'
                                            onChange={(e) => (setEmail(e.target.value))}
                                        />
                                    </div>

                                    <div id="updateProfileImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input type="file"
                                            name='avatar'
                                            accept='image/*'
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>
                                    <input type="submit" value='Update' className='updateProfileBtn' />
                                </form>
                            </div>
                        </div></>
            }
        </>
    )
}

export default UpdateProfile
