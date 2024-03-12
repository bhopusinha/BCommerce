import { useEffect, useState } from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webfont from 'webfontloader';
import ProductDetail from './component/ProductDetail/ProductDetail.js'
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignup from './component/User/LoginSignup.js';
import store from './store.js';
import { loadUser } from './actions/userActions.js';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
// import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import Dashboard from './component/Admin/Dashboard.js';
import AdminProducts from './component/Admin/AdminProducts.js';
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import OrderList from './component/Admin/OrderList.js';
import UpdateOrder from './component/Admin/UpdateOrder.js';
import UserList from './component/Admin/UserList.js';
import UserUpdate from './component/Admin/UserUpdate.js';
import ReviewList from './component/Admin/ReviewList.js';
import Contact from './component/layout/Contact/Contact.js';

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    try {
      const { data } = await axios.get('api/v1/stripeapikey');
      setStripeApiKey(data.stripApiKey);
    } catch (error) {
      console.error('Error fetching Stripe API key:', error);
    }
  };


  useEffect(() => {
    webfont.load({
      google: {
        families: ["roboto", "droid sans", "chilanka"]
      }
    })

    getStripeApiKey();
    store.dispatch(loadUser());

  }, []);

  return <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
      <Route exact path='/' Component={Home} />
      <Route exact path='/product/:id' Component={ProductDetail} />
      <Route exact path='/products' Component={Products} />
      <Route exact path='/products/:keyword' Component={Products} />
      <Route exact path='/Search' Component={Search} />
      {isAuthenticated && <Route exact path='/account' Component={Profile} />}
      {isAuthenticated && <Route exact path='/me/update' Component={UpdateProfile} />}
      {isAuthenticated && <Route exact path='/password/update' Component={UpdatePassword} />}
      <Route exact path='/password/forget' Component={ForgotPassword} />
      <Route exact path='/password/reset/:token' Component={ResetPassword} />
      {/* <ProtectedRoute exact path='/account' component={Profile} /> */}
      <Route exact path='/login' Component={LoginSignup} />
      <Route exact path='/cart' Component={Cart} />
      {isAuthenticated && <Route exact path='/shipping' Component={Shipping} />}
      {isAuthenticated && <Route exact path='/order/confirm' Component={ConfirmOrder} />}
      {/* {stripeApiKey && isAuthenticated && <Route exact path='/process/payment' element={<Payment stripeApiKey={stripeApiKey} />} />} */}

      {stripeApiKey && isAuthenticated && <Route exact path='/process/payment' element={
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      } />}

      {isAuthenticated && <Route exact path='/success' Component={OrderSuccess} />}
      {isAuthenticated && <Route exact path='/orders' Component={MyOrders} />}

      {isAuthenticated && <Route exact path='/order/:id' Component={OrderDetails} />}
      {isAuthenticated && <Route exact path='/admin/dashboard' element={<Dashboard isAdmin={user.role} />} />}
      {isAuthenticated && <Route exact path='/admin/products' Component={AdminProducts} />}
      {isAuthenticated && <Route exact path='/admin/product' element={<NewProduct isAdmin={user.role} />} />}
      {isAuthenticated && <Route exact path='/admin/product/:id' element={<UpdateProduct isAdmin={user.role} />} />}
      {isAuthenticated && <Route exact path='/admin/orders' element={<OrderList isAdmin={user.role} />} />}
      {isAuthenticated && <Route exact path='/admin/order/:id' element={<UpdateOrder isAdmin={user.role} />} />}
      {isAuthenticated && <Route exact path='/admin/users' element={<UserList isAdmin={user.role} />} />}
      {isAuthenticated && <Route exact path='/admin/user/:id' element={<UserUpdate isAdmin={user.role} />} />}
      {isAuthenticated && <Route exact path='/admin/reviews' element={<ReviewList isAdmin={user.role} />} />}
       <Route path='/contact' Component={Contact} />
    </Routes>
    <Footer />
  </Router>

}

export default App;
