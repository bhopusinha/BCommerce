import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { ClearError, getProduct } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Product.css';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const categories = [
  "Laptop",
  "FootWear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
]

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setprice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error, resultPerPage, productsCount,filterProductCount} = useSelector((state) => state.product)
   
  let count=filterProductCount;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }
  
  const priceHandler = (event, newprice) => {
    setprice(newprice);
  }
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    console.log(category);
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, error, currentPage, alert, price, category, ratings])

  return (
    <>
      {
        loading ? <Loader /> :
          <>

          <MetaData title="PRODUCTS -- ECOMMERCE" />  

            <h2 className="productsHeading">
              Products
            </h2>

            <div className="products">
              {
                products && products.map((item, i) => {
                  return <ProductCard product={item} key={item._id} />
                })
              }
            </div>

            
              <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={25000}
                />

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {
                    categories.map((category) => (
                      <li className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))
                  }
                </ul>

                <fieldset>
                  <Typography component="legend" >Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => setRatings(newRating)}
                    aria-labelledby='continuous-slider'
                    valueLabelDisplay='auto'
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>

            {
              resultPerPage < count &&
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText='1st'
                  lastPageText="Last"
                  itemClass='page-item'
                  linkClass='page-link'
                  activeClass='pageItemActive'
                  activeLinkClass='pageLinkActive'
                />
              </div>
            }
          </>
      }
    </>
  )
}

export default Products
