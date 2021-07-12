import EditPost from "../Components/EditPost/EditPost"
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Category from "../Components/Category/Category"

const EditPostPage = () => {
    return ( 
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Header/>
            <Category/>
            <h2 style={{color:'#002f34', fontWeight:600, padding:'20px'}}>EDIT YOUR POST</h2>
            <EditPost/>
            <Footer/>
        </div>
     );
}
 
export default EditPostPage;