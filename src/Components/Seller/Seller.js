import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import db from '../../firebase';
import Cards from '../Cards/Cards';
import './Seller.css'

const Seller = () => {
    const { profileId } = useParams();
    const [sellerDetails, setSellerDetails] = useState();
    const [sellerAds, setSellerAds] = useState([]);


    useEffect(() => {
        db.collection('users').doc(`${profileId}`).get().then(res => {
            setSellerDetails(res.data())
        })
    }, [profileId])
    useEffect(() => {
        db.collection('products').where('userId', '==', `${sellerDetails?.id}`).onSnapshot(snapshot => {
            const allPost = snapshot.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id
                }
            })
            setSellerAds(allPost)
        })
    }, [sellerDetails])

    const handleShareClick = () => {
        const locationRef = window.location.href
        navigator.clipboard.writeText(locationRef)
    }


    return (
        <div className="seller__component">
            {
                (!sellerDetails) ?
                    <h1>User not found</h1>
                    :
                    <>
                        <div className="seller__profileName">
                            <img src={sellerDetails?.photourl} alt="img" />
                            <h1>{sellerDetails?.username}</h1>
                            <p>Share profile link</p>
                        </div>
                        <div className="seller__details">
                            <div className="seller__rightSide">
                                <div className="seller__profileInfo">
                                    <h5>FRIENDS</h5>
                                    <h6>FOLLOWERS</h6>
                                    <h6>FOLLOWING</h6>
                                </div>
                                <div className="seller__profileInfo">
                                    <h5>Linked accounts</h5>
                                    <h6>GOOGLE</h6>
                                    <h6>PHONE NUMBER</h6>
                                    <h6>EMAIL</h6>
                                </div>
                                <div className="profile__otherInfo">
                                    <h6>Member since {sellerDetails?.createdAt?.toDate().toLocaleString('en-IN', { month: 'short', year: 'numeric' })}</h6>
                                    <h5 onClick={handleShareClick}>Share profile link</h5>
                                </div>
                            </div>
                            <div className="seller__ads">
                                <h6>Published Ads</h6>
                                <div className="sellerAds__container">
                                    {
                                        sellerAds.map(product => {
                                            return (
                                                <div className="sellerAds__cards" key={product.id}>
                                                    <Cards product={product} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    (sellerAds?.length === 0) && (
                                        <div className="myads__noads">
                                            <h1>No ads to display</h1>
                                        </div>
                                    )
                                }

                            </div>

                        </div>
                    </>
            }
        </div>
    );
}

export default Seller;