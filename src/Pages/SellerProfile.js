import Category from "../Components/Category/Category"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import Seller from "../Components/Seller/Seller"

const SellerProfile = () => {
    return ( 
        <div className="seller__page">
            <Header/>
            <Category/>
            <Seller/>
            <Footer/>
        </div>
     );
}
 
export default SellerProfile;