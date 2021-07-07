import { useHistory, useParams } from "react-router";
import Category from "../Components/Category/Category"
import EditProfileInfo from "../Components/EditProfile/EditProfileInfo";
import EditProfilePicture from "../Components/EditProfilePicture/EditProfilePicture";
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"



const EditPage = () => {
    const { editInfo } = useParams()
    const history = useHistory();


    return (
        <div className="edit__page">
            <Header />
            <Category />
            <div className="editPage__main">
                <div className="editPge__links">
                    <p onClick={() => history.push('/editprofile/info')}>Edit Profile</p>
                    <p onClick={() => history.push('/editprofile/picture')} > Profile Picture</p>
                </div>
                <div className="editPage__contents">

                    {(editInfo === 'info') && <EditProfileInfo />}
                    {(editInfo === 'picture') && <EditProfilePicture />}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EditPage;