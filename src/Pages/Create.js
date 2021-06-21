import React, { Fragment } from 'react';
import './Create.css';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import Footer from '../Components/Footer/Footer';
import { Redirect, useHistory } from 'react-router';

const CreatePage = ({user}) => {
  const history = useHistory();

  if(!user){
    return <Redirect to={{
      pathname: "/",
      state: {from: "create"}
    }} />
  } 
  return (
    <div>
      <Create />
    </div>

  );
};

export default CreatePage;
