import Categories from '../components/Categories'
import CategoriesByCountry from "../components/CategoriesByCountry";
const CategoriesPage = () => {
    return ( <div className="mt-0 select-none">
        <Categories />
        <CategoriesByCountry />
    </div> );
}
 
export default CategoriesPage;