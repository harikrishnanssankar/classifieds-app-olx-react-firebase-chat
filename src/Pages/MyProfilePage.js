import './MyProfilePage.css';
import Header from '../Components/Header/Header';
import Profile from '../Components/Profile/Profile';
import Footer from '../Components/Footer/Footer';
import Category from '../Components/Category/Category';

const MyProfilePage = () => {
    return (
        <div className="profile__page">
            <Header/>
            <Category/>
            <Profile/>
            <Footer/>
        </div>
    );
}

export default MyProfilePage;