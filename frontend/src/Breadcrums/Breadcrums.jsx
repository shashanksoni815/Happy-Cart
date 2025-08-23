import './Breadcrum.css'
import arrowIcon from '../assets/Frontend_Assets/arrow.png'

function Breadcrums(props) {
    const {product} = props;



    return ( 
        <div className="breadcrum">
            Home <img src={arrowIcon} alt="icon" /> SHOP <img src={arrowIcon} alt="icon" /> {product.category} <img src={arrowIcon} alt="icon" /> {product.name}
        </div>
     );
}

export default Breadcrums;