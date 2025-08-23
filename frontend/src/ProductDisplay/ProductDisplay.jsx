import "./ProductDisplay.css";
import starIcon from "../assets/Frontend_Assets/star_icon.png"
import starDullIcon from "../assets/Frontend_Assets/star_dull_icon.png"
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";


function ProductDisplay(props) {

    const {product} = props;
    const {addToCart} = useContext(ShopContext);

    return ( 
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="img" />
                    <img src={product.image} alt="img" />
                    <img src={product.image} alt="img" />
                    <img src={product.image} alt="img" />
                </div>
                <div className="productdisplay-img">
                    <img src={product.image} alt="img" className="productdisplay-main-img" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={starIcon} alt="star" />
                    <img src={starIcon} alt="star" />
                    <img src={starIcon} alt="star" />
                    <img src={starIcon} alt="star" />
                    <img src={starDullIcon} alt="star" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint asperiores dolore recusandae, nulla, similique officia voluptas optio eos, ullam iste earum minima dicta pariatur. Aut dicta neque maxime iure quod!
                    Accusantium qui eos voluptatem, id amet officiis fugiat! Ipsam dolore perferendis impedit minima aliquam dignissimos veniam laudantium tenetur consequuntur temporibus rerum sapiente, aspernatur praesentium accusantium, nam, placeat numquam vero iusto.
                    Quisquam accusantium, natus ex doloribus vel nostrum repellendus aperiam illum dicta sunt quia, eos suscipit alias exercitationem cum enim dolore fugiat itaque quas quae distinctio? Maiores repellat aut soluta dolorem!
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => {addToCart(product.id)}} >Add to Cart</button>
                <p className="productdisplay-right-category" > <span>Category :</span>Women, T-Shirt, Crop Top </p>
                <p className="productdisplay-right-category" > <span>Tags :</span>Modern, Latest </p>
            </div>
        </div>
     );
}

export default ProductDisplay;