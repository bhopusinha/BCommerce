import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from '../Admin/Sidebar';
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, getProductDetails, updateProduct } from '../../actions/productActions';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useAlert } from 'react-alert';

const UpdateProduct = ({ isAdmin }) => {

  const navigate = useNavigate();
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error: updateError, isUpdated } = useSelector(state => state.deleteProduct);
  const { products, error } = useSelector((state) => state.productDetailReducers);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  const categories = [
    "Laptop",
    "FootWear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
  ]

  useEffect(() => {

    if (products && products._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(products.name);
      setPrice(products.price);
      setOldImages(products.images);
      setCategory(products.category);
      setDescription(products.description);
      setStock(products.stock);
    }

    if (isAdmin !== 'admin') {
      navigate('/login');
    }

    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(ClearError());
    }

    if (isUpdated) {
      alert.success('Product Updated Successfully!');
      navigate('/admin/products');
      dispatch({
        type: UPDATE_PRODUCT_RESET
      })
    }
  }, [isAdmin,products,error,updateError,isUpdated,alert,navigate,dispatch,id])

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("stock", stock);
    myForm.set("category", category);
    myForm.set("price", price);
    myForm.set("description", description);

    images.forEach((image) => {
      myForm.append("images", image);
    })


    dispatch(updateProduct(id, myForm));

  }

  const updateProductImageChange = (e) => {

    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <Spellcheck />
              <input type="text"
                required
                placeholder='Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <AttachMoney />
              <input type="number"
                required
                placeholder='Product Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Description />
              <textarea cols="30" rows="1"
                required
                placeholder='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <AccountTree />
              <select value={category} required onChange={(e) => setCategory(e.target.value)} >
                <option value="">Product Category</option>
                {categories.map((cate) => (
                  <option value={cate} key={cate} >{cate}</option>
                ))}
              </select>
            </div>

            <div>
              <Storage />
              <input type="number"
                required
                placeholder='Stock'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id='createProductFormFile'>
              <input type="file"
                required
                accept='image/*'
                name='avatar'
                onChange={updateProductImageChange}
              />
            </div>

            <div id="createProductFormImage">
              {
                oldImages && oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt='oldProduct Preview' />
                ))
              }
            </div>

            <div id="createProductFormImage">
              {
                imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt='Product Preview' />
                ))
              }
            </div>

            <button
              type='submit'
              id='createProductBtn'
              disabled={loading === true ? true : false}
            >
              Create
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct
