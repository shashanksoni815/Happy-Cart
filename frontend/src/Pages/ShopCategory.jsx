import { useContext } from "react";
import "./CSS/ShopCategory.css"
import { ShopContext } from "../Context/ShopContext";
import dropdownIcon from "../assets/Frontend_Assets/dropdown_icon.png"
import Item from "../Item/Item";

function ShopCategory(props) {

    const{all_product} = useContext(ShopContext);

    return ( 
        <>
            <div className="shop-category">
                <img className="shopcategory-banner" src={props.banner} alt="banner" />
                <div className="shopcategory-indexSort">
                    <p>
                        <span>Showing 1-12</span> out 36 products
                    </p>
                    <div className="shopcategory-sort">
                        Sort by <img src={dropdownIcon} alt="icon" />
                    </div>
                </div>
                <div className="shopcategory-products">
                    {all_product.map((item, i)=>{
                        if(props.category === item.category) {
                            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                        } else{
                            return null;
                        }
                    })}
                </div>
                <div className="shopcategory-loadmore">
                    Explore More
                </div>
            </div>
        </>
     );
}

export default ShopCategory;