import React, { useEffect, useState } from 'react';
import './NewProduct.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from '../Admin/Sidebar';
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ClearError, createProduct } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useAlert } from 'react-alert';

const NewProduct = ({ isAdmin }) => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
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
        if (isAdmin !== 'admin') {
            navigate('/login');
        }

        if (error) {
            alert.error(error);
            dispatch(ClearError());
        }

        if (success) {
            alert.success('Product Created Successfully!');
            navigate('/admin/dashboard');
            dispatch({
                type: NEW_PRODUCT_RESET
            })
        }

    }, [isAdmin, navigate, success, error, alert, dispatch])

    const createProductSubmitHandler = (e) => {
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


        dispatch(createProduct(myForm));

    }

    const createProductImageChange = (e) => {

        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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
                        onSubmit={createProductSubmitHandler}
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
                            <select required onChange={(e) => setCategory(e.target.value)} >
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
                                onChange={createProductImageChange}
                            />
                        </div>

                        <div id="createProductFormImage">
                            {
                                imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt='Avatar Preview' />
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

export default NewProduct
