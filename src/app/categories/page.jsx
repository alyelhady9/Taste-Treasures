import Categories from "@/app/components/Categories";
import CategoriesByCountry from "../components/CategoriesByCountry";
const CategoriesPage = () => {
    return ( <div className="mt-16 select-none">
        <Categories />
        <CategoriesByCountry />
    </div> );
}
 
export default CategoriesPage;