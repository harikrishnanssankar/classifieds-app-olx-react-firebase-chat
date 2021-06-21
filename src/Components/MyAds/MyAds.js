import { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import { AuthContext } from '../../store/Context';
import Cards from '../Cards/Cards';
import './MyAds.css';


const MyAds = () => {
    const [myAds, setMyAds] = useState([]);
    const { user } = useContext(AuthContext);


    useEffect(() => {

        db.collection('products').where('userId', '==', `${user?.uid}`).get().then(snapshot => {
            const allPost = snapshot.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id
                }
            })
            setMyAds(allPost)
        })
    }, [user?.uid])
    console.log(myAds);


    return (
        <div className="my__ads">
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
    );
}

export default MyAds;