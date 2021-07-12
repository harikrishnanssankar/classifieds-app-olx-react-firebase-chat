import { useHistory, useLocation } from 'react-router';
import './Cards.css';
import db, { firebasestorage } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../store/Context';



const Cards = ({ product }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const imgURL = product.url;




  const favClick = () => {
    if (location.pathname === '/myfavorites') {
      db.collection('users').doc(`${user.uid}`).collection('favorites').doc(`${product.id}`).delete()
    } else {

      db.collection('users').doc(`${user.uid}`).collection('favorites').doc(`${product.id}`).set({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        url: product.url,
        userId: user.uid,
        date: product.date,
      });
    }
  }
  const deleteAd = () => {
    let name = imgURL.substr(imgURL.indexOf('%2F') + 3, (imgURL.indexOf('?')) - (imgURL.indexOf('%2F') + 3));
    name = name.replace('%20', ' ');
    firebasestorage.ref().child(`image/${name}`).delete().then(
      db.collection('products').doc(`${product.id}`).delete()
    ).catch(console.log('err'))
  }
  
  const truncate = (string, n) => {
    return string && string.length > n ? string.substr(0, n - 1) + '...' : string;
}

  return (
    <div key={product.id} className="card__container" >
      <div className="card__favorite" onClick={favClick} >
        <i className={"bi bi-heart-fill card__heart"}></i>
      </div>
      <div className="card__contents" onClick={() => history.push(`/item/${product.id}`)}>
        <div className="card__image">
          <img src={product.url} alt="" />
        </div>
        <div className="card__content">
          <p className="card__rate">&#x20B9; {product.price}</p>
          <span className="card__kilometer">{truncate(product.subCategory, 24)}</span>
          <p className="card__name">{truncate(product.title, 30)}</p>
        </div>
        <div className="card__date">
          <span>{product.createdAt}</span>
        </div>
      </div>
      <div className="card__deleteBtn">
        {
          (location.pathname === '/myads') &&
          <>
          <i onClick={() => history.push(`/editpost/${product.id}`)} className="bi bi-pencil-square"></i>
          <i onClick={deleteAd} className="bi bi-trash"></i>
          </>
        }
      </div>
    </div>
  );
}

export default Cards;