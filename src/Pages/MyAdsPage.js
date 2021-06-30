import { useContext } from "react"
import { Redirect, Route, useHistory, useLocation } from "react-router"
import Category from "../Components/Category/Category"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import MyAds from "../Components/MyAds/MyAds"
import MyFavorites from "../Components/MyFavorites/MyFavorites"
import { AuthContext } from "../store/Context"
import './MyAdsPage.css'

const MyAdsPage = () => {
    const history = useHistory();
    const location = useLocation();
    const { user } = useContext(AuthContext);






    return (
        <div className='myAds__Page'>
            <Header />
            <Category />
            <div className="myAdsPage__navigation">
                <h6 className={(location.pathname === '/myads') ? 'myAds__active' : 'myAds__notActive'} onClick={() => history.push('/myads')}>Ads</h6>
                <h6 className={(location.pathname === '/myfavorites') ? 'myAds__active' : 'myAds__notActive'} onClick={() => history.push('/myfavorites')}>Favourites</h6>
            </div>
            {
                (location.pathname == '/myfavorites') ?
                    <MyFavorites />
                    :
                    <MyAds />
            }
            <Footer />
        </div>
    );
}

export default MyAdsPage;