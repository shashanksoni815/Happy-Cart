import React, { useState } from 'react'
import "./AddProduct.css"
import uploadArea from "../assets/Admin_Assets/upload_area.svg"

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category:"women",
        new_price: "",
        old_price: "",
        description: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const add_Product = async() => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('productImage', image);
        await fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data})
        // console.log(hello);
        if(responseData.success){
            product.image = responseData.image_url;
            console.log("product created")
            await fetch('http://localhost:3000/addproduct', {
                method: "POST",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success?alert('Product Added'):alert('Failed');
            })
        }
    }

  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Enter Product Name' />
        </div>
        <div className="addproduct-itemfield">
            <p>Product Description</p>
            <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Enter Product Description' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Old Price' />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='New Price' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector' id="">
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):uploadArea}  className='addproduct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id="file-input" hidden />
        </div>
        <button onClick={add_Product} className='addproduct-btn' >Add</button>
    </div>
  )
}

export default AddProduct;