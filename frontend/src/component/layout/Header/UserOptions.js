import React, { useState } from 'react';
import './Header.css';
import Backdrop from '@material-ui/core/Backdrop';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Dashboard, Person, ExitToApp, ListAlt, RemoveShoppingCart } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../actions/userActions';


const UserOptions = ({ user }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart);

    const [open, setOpen] = useState(false);
    const options = [
        { icon: <ListAlt />, name: "Orders", func: orders },
        { icon: <RemoveShoppingCart style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <Person />, name: "Profile", func: account },
        { icon: <ExitToApp />, name: "Logout", func: logoutUser }
    ]

    if (user.role === "admin") {
        options.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashboard })
    }

    function orders() {
        navigate('/orders');
    }

    function dashboard() {
        navigate('/admin/dashboard');
    }

    function account() {
        navigate('/account');
    }

    function cart() {
        navigate('/cart');
    }

    async function logoutUser() {
        await dispatch(logOut());
        navigate('/login');
        alert.success('logout successfully!');
    }


    return <>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            direction='down'
            style={{ zIndex: "11" }}
            open={open}
            className='speedDial'
            icon={
                <img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/logo192.png"}
                    alt='Profile'
                />
            }
        >

            {
                options.map((item) => (
                    <SpeedDialAction key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))
            }

        </SpeedDial>
    </>
}

export default UserOptions
