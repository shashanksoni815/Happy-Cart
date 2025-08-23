import React from 'react'
import "./RelatedProduct.css";
import dataProduct from "../assets/Frontend_Assets/data.js"
import Item from '../Item/Item.jsx';

const RelatedProduct = () => {
  return (
    <div className='realtedproduct'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {dataProduct.map((item,i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default RelatedProduct