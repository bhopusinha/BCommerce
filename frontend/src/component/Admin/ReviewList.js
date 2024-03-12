import { Button } from '@material-ui/core';
import { Delete, Star } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import { ClearError, deleteReviews, getAllReviews } from '../../actions/productActions';
import './ReviewList.css';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ReviewList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();
  const [productId, setProductId] = useState("");

  const { error, reviews, loading } = useSelector(state => state.productReview);
  const { error: deleteError, isDeleted } = useSelector(state => state.deleteReview)


  const deleteReviewHandler = (id) => {
    dispatch(deleteReviews(id,productId));
  }

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews());
  }


  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.2 },
    { field: "user", headerName: "User", minWidth: 150, flex: 0.2 },
    { field: "comment", headerName: "Comment", minWidth: 150, flex: 0.2 },
    { field: "rating", headerName: "Rating", minWidth: 150, type: 'number', flex: 0.1 ,
     cellClassName:(params)=>{
      return params.getValue(params.id,"rating")>=3 ? 'greenColor':'redColor';
     }
  },
    {
      field: "actions", headerName: "Actions", minWidth: 150, type: 'number', flex: 0.1, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))} >
              <Delete />
            </Button>
          </>
        )
      }
    },
  ]

  useEffect(() => {

    if(productId && productId.length===24){
    dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (deleteError) {
      alert.error(deleteError);
    }

    if (isDeleted) {
      alert.success('review is Deleted Successfully!');
      navigate('/admin/reviews');
      dispatch({ type: DELETE_REVIEW_RESET })
    }

  }, [error, dispatch, alert, isDeleted, deleteError, navigate,productId])


  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating
      })
    });

  return (
    <>
      <MetaData title='ALL REVIEWS - admin' />
      <div className="dashboard">
        <Sidebar />

        <div className="productReviewsContainer">

          <form
            className='productReviewsForm'
            // style={{
            //   height: "70%",
            //   marginTop: "5vmax",
            //   display: reviews.length > 0 ? 'none' : 'grid'
            // }}
            onSubmit={updateUserSubmitHandler}
          >
            <h1 id='productReviewsHeading'>Update User</h1>

            <div>
              <Star />
              <input type="text"
                required
                placeholder='Product Id'
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              type='submit'
              id='createProductBtn'
              disabled={loading === true ? true : false}
            >
              Update
            </Button>

          </form>


          {
            <>
              {reviews && reviews.length > 0 ? <DataGrid
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                pageSize={10}
                className='productListTable'
                autoHeight
              /> : (
                <h1 id='productReviewsHeading' >No Reviews Found !</h1>
              )}
            </>
          }

        </div>
      </div>
    </>
  )
}

export default ReviewList;
