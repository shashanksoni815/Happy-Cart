import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrums from "../Breadcrums/Breadcrums";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import DiscriptionBox from "../DiscriptionBox.jsx/DiscriptionBox";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

function Product() {
    const {all_product} = useContext(ShopContext)
    const {productId} = useParams()
    const product = all_product.find((e) => e.id === Number(productId))
    return ( 
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DiscriptionBox />
            <RelatedProduct />
        </div>
     );
}

export default Product;