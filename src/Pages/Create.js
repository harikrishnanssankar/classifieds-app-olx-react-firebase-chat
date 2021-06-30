import React, { useContext, useEffect } from 'react';
import './Create.css';
import Create from '../Components/Create/Create';
import { Redirect } from 'react-router';
import { AuthContext } from '../store/Context';

const CreatePage = () => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    
    if(!user){
      return <Redirect to={{
        pathname: "/",
        state: {from: "create"}
      }} />
    } 
    return () => {
      
    }
  }, [])
  return (
    <div>
      <Create />
    </div>

  );
};

export default CreatePage;
