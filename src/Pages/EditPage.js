import { useContext, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import Category from "../Components/Category/Category"
import EditProfileInfo from "../Components/EditProfile/EditProfileInfo";
import EditProfilePicture from "../Components/EditProfilePicture/EditProfilePicture";
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import { AuthContext } from "../store/Context";
import './EditPage.css'



const EditPage = () => {
    const { user } = useContext(AuthContext)
    const { editInfo } = useParams()
    const history = useHistory();

    useEffect(() => {
        if(!user){
          return <Redirect to={{
            pathname: "/",
          }} />
        } 
      }, [user])


    return (
        <div className="edit__page">
            <Header />
            <Category />
            <div className="editPage__main">
                <div className="editPage__links">
                    <p className={(editInfo === 'info') ? 'editPage__activeLink' : 'editPage__link'} onClick={() => history.push('/editprofile/info')}>Edit Profile</p>
                    <p className={(editInfo === 'picture') ? 'editPage__activeLink' : 'editPage__link'} onClick={() => history.push('/editprofile/picture')} > Profile Picture</p>
                    <button onClick={() => history.push('/myProfile')} >View Profile</button>
                </div>
                <div className="editPage__contents">
                    {
                        (editInfo === 'info')
                        &&
                        <EditProfileInfo />
                    }
                    {(editInfo === 'picture') && <EditProfilePicture />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditPage;