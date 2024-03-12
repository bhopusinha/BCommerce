import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useSelector, useDispatch } from 'react-redux';
import { ClearError, getProductDetails, productReviewDetails } from '../../actions/productActions';
import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData.js';
import { addToCart } from '../../actions/cartActions.js';
import { Dialog, DialogActions, DialogContent, Button, DialogTitle } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { PRODUCT_REVIEW_RESET } from '../../constants/productConstants.js';


const ProductDetail = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const alert = useAlert();
  const { id } = useParams();
  const { products, loading, error } = useSelector((state) => state.productDetailReducers);
  const { success, error: reviewAsError } = useSelector((state) => state.newReviewReducer);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if(reviewAsError){
      alert.error(reviewAsError);
      dispatch(ClearError());
    }

    if(success){
      alert.success("Review Submit Successfully!");
      dispatch({type:PRODUCT_REVIEW_RESET});
    }

    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert,reviewAsError,success])

  const options = {
    size: "large",
    value: products.ratings,
    readOnly:true,
    precision:0.5
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }


  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(productReviewDetails(myForm));
   
    setOpen(false);

  }

  const increaseQuantity = () => {
    if (products.stock <= quantity) return;
    const value = quantity + 1;
    setQuantity(value);
  }

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const value = quantity - 1;
    setQuantity(value);
  }

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    alert.success("Item Add to Cart");
  }

  return (
    <>
      {loading ? <Loader /> :
        <>
          <MetaData title={`${products.name} -- ECOMMERCE`} />

          <div className="ProductDetails">
            <div className="carouselImage">
              {products.images &&
                // eslint-disable-next-line array-callback-return
                products.images.map((item, i) => {
                  if (i === 0) {
                    return <img
                      key={item.url}
                      src={item.url}
                      alt={`${i} slide`}
                    />
                  }
                })}
            </div>

            <div className="content">
              <div className="detailsBlock-1">
                <h2>{products.name}</h2>
                <p>Product # {products._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({products.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${products.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input value={quantity} type="number" />
                    <button onClick={increaseQuantity} >+</button>
                  </div>
                  <button
                    disabled={products.stock < 1 ? true : false}
                    onClick={addItemToCart}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={products.stock < 1 ? "redColor" : "greenColor"}>
                    {products.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{products.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle} >
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog' >
              <Rating onChange={(e) => setRating(e.target.value)}
                value={rating}
                size='large'
              />

              <textarea className="submitDialogTextArea"
                cols='30'
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color='secondary' >Cancel</Button>
              <Button onClick={reviewSubmitHandler} color='primary' >Submit</Button>
            </DialogActions>
          </Dialog>

          {products.reviews && products.reviews[0] ? (
            <div className="reviews">
              {products.reviews &&
                products.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      }
    </>
  );
};

export default ProductDetail;
