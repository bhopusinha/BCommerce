import React, { useEffect} from "react";
import { CiDesktopMouse2 } from "react-icons/ci";
import "./Home.css";
import Product from './ProductCard.js';
import MetaData from "../layout/MetaData.js";
import { ClearError, getProduct } from '../../actions/productActions.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.js';
import {useAlert} from 'react-alert';


const Home = () => {
    const alert=useAlert();
    const dispatch = useDispatch();
    const { loading, error, products} = useSelector((state) => state.product)
    useEffect(() => {
        if(error){
            alert.error(error);
      dispatch(ClearError());
        }
        dispatch(getProduct());
    }, [dispatch,error,alert]);

    return <>
        {loading ? <Loader /> :
           <>
                <MetaData title="ECOMMERCE" />
                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button>
                            Scroll <CiDesktopMouse2 />
                        </button>
                    </a>

                </div>
                <h2 className="homeHeading">Features products</h2>
                <div className="container" id="container">
                    {products && products.map((value) => {
                        return <Product product={value} />
                    })}
                </div> 
            </>
            
        }
    </>
};

export default Home;