import "./Hero.css";
import handImg from "../assets/Frontend_Assets/hand_icon.png";
import arrowIcon from "../assets/Frontend_Assets/arrow.png";
import hero_image from "../assets/Frontend_Assets/hero_image.png";

function Hero() {
    return ( 
        <>
            <div className="hero">
                <div className="hero-left">
                    <h2>NEW ARRIVALS ONLY</h2>
                    <div>
                        <div className="hero-hand-icon">
                            <p>New</p>
                            <img src={handImg} alt="Hand Icon" />
                        </div>
                        <p>Collections</p>
                        <p>for everyone</p>
                    </div>
                    <div className="hero-latest-btn">
                        <div>Latest Collection</div>
                        <img src={arrowIcon} alt="arrow" />
                    </div>
                </div>
                <div className="hero-right">
                    <img src={hero_image} alt="hero" />
                </div>
            </div>
        </>
     );
}

export default Hero;

