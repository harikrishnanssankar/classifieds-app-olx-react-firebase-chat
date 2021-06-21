import { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import { AuthContext } from '../../store/Context';
import './MyFavorites.css'




const MyFavorites = () => {
    const [favorite, setFavorite] = useState([])
    const [products, setProducts] = useState([])
    const { user } = useContext(AuthContext);
    const [favProducts, setFavProducts] = useState([])

    useEffect(() => {
        db.doc(`/users/${user.uid}`).get().then(res => {
            setFavorite(res.data().favorite)
        })
    }, [])

    // useEffect(() => {
    //     db.collection('products').get().then(snapshot => {
    //         const allPost = snapshot.docs.map((product) => {
    //             return {
    //                 title:product.data().title,
    //                 id:product.data().id,
    //                 price:product.data().price,
    //                 category:product.data().category,
    //                 subCategory:product.data().subCategory,
    //                 userId:product.data().userId,
    //                 url:product.data().url,
    //                 description:product.data().description,
    //                 date:product.data().date,


    //             }
    //         })
    //         setProducts(allPost)
    //     })
    // }, [])
    



    console.log(products);



    return (
        <div className="myFavorites">


        </div>
    );
}

export default MyFavorites;