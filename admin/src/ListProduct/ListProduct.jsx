import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import crossIcon from "../assets/Admin_Assets/cross_icon.png";

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async() => {
    await fetch('https://happy-cart-1.onrender.com/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)})
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await fetch("https://happy-cart-1.onrender.com/removeproduct", {
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({id})
      })
      await fetchInfo();
    } catch (err) {
    console.error("Failed to remove product:", err);
    }
  }

  return (
    <div className='list-product'>
        <h1>All Product List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product, index)=>{
            return <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={() => removeProduct(product.id)} src={crossIcon} alt="" className="listproduct-remove-icon" />
              
            </div>
          })}
        </div>
    </div>  
  )
}

export default ListProduct;