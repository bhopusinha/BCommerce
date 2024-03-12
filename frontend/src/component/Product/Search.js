import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import MetaData from '../layout/MetaData';

const Search = () => {
  
  const Navigate=useNavigate();
  const [keyword, setKeyWord] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
     Navigate(`/products/${keyword}`);
    } else {
      Navigate(`/products`);
    }
  }

  return (
    <>
    <MetaData title="search A product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler} >

        <input type="text" placeholder='Search a product...' onChange={(e) => setKeyWord(e.target.value)} />

        <input type="submit" value="Search" />
      </form>
    </>
  )
}

export default Search
