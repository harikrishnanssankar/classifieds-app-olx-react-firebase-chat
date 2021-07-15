import { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import { AuthContext } from '../../store/Context';
import './Profile.css';
import { useHistory } from 'react-router';
import SellButtonPlus from '../../assets/SellButtonPlus';
import SellButton from '../../assets/SellButton';
import Cards from '../Cards/Cards';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState([]);
    const history = useHistory();
    const [myAds, setMyAds] = useState([]);

    useEffect(() => {
        db.collection('users').doc(`${user?.uid}`).get().then(res => {
            setUserDetails(res.data())
        })
        return () => {

        }
    }, [user])
    useEffect(() => {
        db.collection('products').where('userId', '==', `${user?.uid}`).onSnapshot(snapshot => {
            const allPost = snapshot.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id
                }
            })
            setMyAds(allPost)
        })
    }, [user])
    const copyProfileLink = () => {
        const location = window.location.origin
        navigator.clipboard.writeText(`${location}/profile/${userDetails.id}`)
    }

    return (
        <div className="profile__component">
            <div className="profile__imageContainer">
                <img className="profile__image" src={userDetails?.photourl} alt="img" />
            </div>
            <div className="profile__titleEdit">
                <div>
                    <h1>{userDetails?.username}</h1>
                    <p onClick={() => history.push('/editprofile/info')} className="profile__editBtn">Edit Profile</p>
                </div>
                <span>{userDetails?.about}</span>
            </div>
            <div className="profile__infos">
                <div className="profile__info">
                    <h5>FRIENDS</h5>
                    <h6>FOLLOWERS</h6>
                    <h6>FOLLOWING</h6>
                </div>
                <div className="profile__info">
                    <h5>Linked accounts</h5>
                    <h6>GOOGLE</h6>
                    <h6>PHONE NUMBER</h6>
                    <h6>EMAIL</h6>
                </div>
                <div className="profile__otherInfo">
                    <h6>Member since {userDetails?.createdAt?.toDate().toLocaleString('en-IN', { month: 'short', year: 'numeric' })}</h6>
                    <h5 onClick={copyProfileLink}>Share profile link</h5>
                </div>
            </div>
            
            <div className="profile__myAdsComponents" >
                <div className="profile__myAdsContainer">
                    {
                        myAds.map(product => {
                            return (
                                <div className="myAds__cards" key={product.id}>
                                    <Cards product={product} />
                                </div>
                            )
                        })
                    }
                </div>
                {
                    (myAds.length === 0) && (
                        <div className="myads__noads">
                            <h1>Sorry, No ads to display</h1>
                            <h3>Start selling</h3>
                            <div onClick={() => history.push('/create')}>
                                <div className="myads__sellMenu">
                                    <SellButton ></SellButton>
                                    <div className="myads__sellMenuContent">
                                        <SellButtonPlus></SellButtonPlus>
                                        <span>SELL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Profile;