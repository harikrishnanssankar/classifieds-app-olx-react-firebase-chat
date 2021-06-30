import { useContext, useEffect, useState } from 'react';
import db from '../../firebase';
import { AuthContext } from '../../store/Context';
import Cards from '../Cards/Cards';
import './MyFavorites.css'




const MyFavorites = () => {
  const [favorite, setFavorite] = useState([])
  const [products, setProducts] = useState([])
  const { user } = useContext(AuthContext);
  const [favProducts, setFavProducts] = useState([])

  // useEffect(() => {
  //     db.doc(`/users/${user.uid}`).get().then(res => {
  //         setFavorite(res.data().favorite)
  //     })
  // }, [])

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

  // useEffect(() => {
  //   user &&
  //     db.collection('users').doc(`${user.uid}`).collection(`favorites`).get().then(snapshot => {
  //       const allPost = snapshot.docs.map((product) => {
  //         return {
  //           ...product.data(),
  //           id: product.id
  //         }
  //       })
  //       setProducts(allPost)
  //     })
  //   return () => {
  //   }
  // }, [user])

  useEffect(() => {
    user &&
      db.collection('users').doc(`${user.uid}`).collection(`favorites`).onSnapshot(snapshot => {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id
          }
        })
        setProducts(allPost)
      })
    return () => {
    }
  }, [user])






  return (
    <div className="myFavorites">
      <div className="myFav__cards">
        {
          products.map(product => {
            return (
              <div className="myFav__card" key={product.id}>
                <Cards product={product} />
              </div>
            )
          })
        }
      </div>


    </div>
  );
}

export default MyFavorites;