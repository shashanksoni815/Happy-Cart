import "./NewCollections.css";
// import newCollection from "../assets/Frontend_Assets/new_collections"
import Item from "../Item/Item";
import { useState } from "react";
import { useEffect } from "react";

function NewCollections() {

    const [newCollection, setNewCollection] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/newcollections')
        .then((response) => response.json())
        .then((data) => setNewCollection(data));
    }, [])

    return ( 
        <div className="new-collections">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollection.map((item,i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
     );
}

export default NewCollections;