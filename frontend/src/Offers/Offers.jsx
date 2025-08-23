import "./Offers.css"
import exclusiveImage from "../assets/Frontend_Assets/exclusive_image.png"


function Offers() {
    return ( 
        <div className="offers">
            <div className="offers-left">
                <h1>Execlusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusiveImage} alt="img" />
            </div>
        </div> 
     );
}

export default Offers;