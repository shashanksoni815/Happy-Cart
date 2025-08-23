import "./Popular.css"
// import dataProduct from "../assets/Frontend_Assets/data.js"
import Item from "../Item/Item.jsx";
import { useState } from "react";
import { useEffect } from "react";

function Popular() {

    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/popularinwomen')
        .then((response) => response.json())
        .then((data) => setPopularProducts(data));
    }, []);

    return ( 
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
     );
}

export default Popular;