import { useHistory } from 'react-router';
import Heart from '../../assets/Heart';
import './Cards.css';
import db from '../../firebase';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../store/Context';



const Cards = ({ product }) => {
  const isMounted = useRef(false);
  const [favorite, setFavorite] = useState([]);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState('');
  const [favToggle, setFavToggle] = useState(false)



  // const fetchData = () => {
  //   db.doc(`/users/${user.uid}`).get().then(res => {
  //     if (isMounted.current) {
  //       setFavorite(res.data().favorite)
  //     }
  //   }).catch(err => {
  //     isMounted.current && setError(err)
  //   })
  //   if (favorite?.includes(product.id)) {
  //     setFavToggle(true);
  //   }
  // }
  // useEffect(() => {
  //   isMounted.current = true;
  //   fetchData();
  //   return () => (isMounted.current = false);
  // }, []);
 
  // const favoriteClick = () => {
  //   setFavToggle(!favToggle)
  //   if (favorite?.includes(product.id)) {
  //     const deleteItem = { favorite: favorite.filter(fav => fav !== product.id) }
  //     db.doc(`/users/${user.uid}`).set(deleteItem, { merge: true })
  //   } else {
  //     const data = { favorite: [...favorite, product.id] }
  //     db.doc(`/users/${user.uid}`).set(data, { merge: true });
  //   }
  // }
  return (

    <div className="card__container" >
      <div className="card__favorite" >
        <i className={!favToggle ? "bi bi-heart" : "bi bi-heart-fill"}></i>
      </div>
      <div onClick={() => history.push(`/item/${product.id}`)} key={product.id} className="card__image">
        <img src={product.url} alt="" />
      </div>
      <div className="card__content">
        <p className="card__rate">&#x20B9; {product.price}</p>
        <span className="card__kilometer">{product.subCategory}</span>
        <p className="card__name">{product.title}</p>
      </div>
      <div className="card__date">
        <span>{product.date}</span>
      </div>
    </div>
  );
}

export default Cards;