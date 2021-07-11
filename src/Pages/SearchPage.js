import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './SearchPage.css'
import Fuse from 'fuse.js'
import db from '../firebase';
import Cards from '../Components/Cards/Cards';
import Header from '../Components/Header/Header';
import Category from '../Components/Category/Category'

const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    minMatchCharLength: 3,
    location: 0,
    threshold: 0.6,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    keys: [
        "title",
        "category",
        "subCategory",
        "description",
        "place.value"
    ]
};
const SearchPage = () => {
    const location = useLocation();
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState([]);
    const [result, setResult] = useState([]);
    useEffect(() => {
        const text = location.search.substring(1).replace(/%20/g, ' ')
        setSearchText(text)
    }, [searchText, location])
    useEffect(() => {
        db.collection('products').get().then(snapshot => {
            const allPost = snapshot.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id
                }
            })
            setProducts(allPost)
        })
    }, [searchText, location])

    useEffect(() => {
        const fuse = new Fuse(products, options);
        const results = fuse.search(searchText).map(({ item }) => item);
        setResult(results)
    }, [searchText, products])
    return (
        <div className="search__page">
            <Header />
            <Category/>
            <div className="post__cards">
                {
                    result.map(product => {
                        return (
                            <div className="post__card" key={product.id}>
                                <Cards product={product} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SearchPage;