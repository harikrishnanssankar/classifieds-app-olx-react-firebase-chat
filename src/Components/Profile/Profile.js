import { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import { AuthContext } from '../../store/Context';
import './Profile.css';
import MyAds from '../MyAds/MyAds'
import { useHistory } from 'react-router';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState([]);
    const history = useHistory();

    useEffect(() => {
        db.collection('users').doc(`${user?.uid}`).get().then(res => {
            setUserDetails(res.data())
        })
        return () => {

        }
    }, [user])
    const copyProfileLink = () => {
        navigator.clipboard.writeText(`localhost:3000/profile/${userDetails.id}`)
    }
    return (
        <div className="profile__component">
            <div className="profile__leftSide">
                <img className="profile__image" src={userDetails.photourl} alt="img" />
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
                    <h6>Member since {userDetails?.createdAt?.toDate().toLocaleString('en-IN', {  month: 'short', year: 'numeric' })}</h6>
                    <h5 onClick={copyProfileLink}>Share profile link</h5>
                </div>
            </div>
            <div className="profile__rightSide">
                <div className="profile__titleEdit">
                    <h1>{userDetails?.username}</h1>
                    <p onClick={() => history.push('/editprofile/info')} className="profile__editBtn">Edit Profile</p>
                </div>
                <MyAds/>
            </div>
        </div>
    );
}

export default Profile;