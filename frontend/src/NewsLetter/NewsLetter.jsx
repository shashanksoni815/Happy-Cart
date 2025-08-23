import "./NewsLetter.css";

function NewsLetter() {
    return ( 
        <div className="newsLetter">
            <h1>Get Execlusive Offers on your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
            </div>
        </div>
     );
}

export default NewsLetter;