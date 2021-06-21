import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import db from '../../firebase';
import Header from '../Header/Header';

import './View.css';
function View() {

  const [data, setData] = useState({})
  const { productId } = useParams();
  const [sellerDetails, setSellerDetails] = useState({});



  useEffect(() => {
    //fetching product Details
    db.collection('products').doc(`${productId}`).get()
      .then(snapshot => {
        setData(snapshot.data());
      });
    //fetching seller details
    db.collection('users').where('id', '==', `${data.userId}`).get().then(res => {
      res.forEach(doc => {
        setSellerDetails(doc.data());
      })
    })
  }, [data.userId, productId])





  return (

    <div className="item__parentDiv">
      <span>{data.category + ' / ' + data.subCategory}</span>
      <div className="item__details">
        <div className="item__img">
          <img
            src={data.url}
            alt="error loading"
          />
        </div>
        <div className="item__description">
          <div className="item__productDescription">
            <p>&#x20B9; {data.price} </p>
            <span>{data.title}</span>
            <p>{data.subCategory}</p>
            <span>{data.date}</span>
          </div>
          <div className="item__sellerDescription">
            <p>Seller description</p>
            <p>{sellerDetails.username}</p>
            <p>{sellerDetails.phone}</p>
          </div>
          <div className="item__location">
            <p>Posted in</p>
            <p>Lorem ipsum dolor sit amet</p>  
          </div>
        </div>
      </div>
      <div className="item__moreInfo">
        <h5>Description</h5>
        <p>{data.description}</p>

      </div>
    </div>

  );
}
export default View;
