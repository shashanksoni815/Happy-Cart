import "./Footer.css"
import logo from "../assets/Frontend_Assets/logo_big.png";
import instaIcon from "../assets/Frontend_Assets/instagram_icon.png"
import pinTestIcon from "../assets/Frontend_Assets/pintester_icon.png"
import whatsappIcon from "../assets/Frontend_Assets/whatsapp_icon.png"




function Footer() {
    return ( 
        <div className="footer">
            <div className="footer-logo">
                <img src={logo} alt="img" />
                <p>Happy Cart</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instaIcon} alt="icon" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinTestIcon} alt="icon" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsappIcon} alt="icon" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright at 2025 - All Right Reserved</p>
            </div>
        </div>
     );
}

export default Footer;