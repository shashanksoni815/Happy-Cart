import Hero from "../Hero/Hero";
import NewCollections from "../NewCollections/NewCollections";
import NewsLetter from "../NewsLetter/NewsLetter";
import Offers from "../Offers/Offers";
import Popular from "../Popular/Popular";

function Home() {
    return ( 
        <>
           <Hero/>
           <Popular/>
           <Offers/>
           <NewCollections/>
           <NewsLetter />
        </>
     );
}

export default Home;