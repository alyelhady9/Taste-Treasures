// "use client"

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// const Categories = () => {
//         const [categories, setCategories] = useState([]);
        
//         useEffect(() => {
//             const fetchCategories = async () => {
//                 try {
//                     const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
//                     setCategories(response.data.categories);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             };
//             fetchCategories();
//         }, []);
//     return ( 
//         <div className="w-full text-center flex justify-center mt-20 z-10 relative">
//             <div className="w-8/12 max-md:w-11/12">
//                 <hr className="w-3/4 border-t-2 m-auto mt-2 border-amber-500" />
//                 <h1 className="text-2xl text-amber-500 font-bold">Recipe Categories</h1>
//                 <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-1">
//                     {categories.map(category => (
//                         <Link key={category.idCategory} href={`/categories/${category.strCategory}`} >
//                             <div  className="border min-h-80 cursor-pointer p-4 rounded-lg shadow-lg">
//                                 <img src={category.strCategoryThumb} alt={category.strCategory} className="w-full h-32 object-cover rounded-md" />
//                                 <h2 className="text-lg text-green-500 font-semibold mt-2">{category.strCategory}</h2>
//                                 <p className="text-amber-500">{category.strCategoryDescription.substring(0, 100)}...</p>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>
//         </div>


//      );
// }
 
// export default Categories;


"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
                const filteredCategories = response.data.categories.filter(category => category.strCategory !== "Pork");
                setCategories(filteredCategories);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    return ( 
        <div className="w-full text-center flex justify-center mt-24 z-10 relative">
            <div className="w-8/12 max-md:w-11/12">
               
                <h1 className="text-2xl text-amber-500 font-bold">Recipe Categories</h1>
                <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {categories.map(category => (
                        <Link className="hover:bg-gray-100 h-full " key={category.idCategory} href={`/categories/${category.strCategory}`} >
                            <div className="border min-h-80 cursor-pointer p-4 rounded-lg shadow-lg flex flex-col justify-center items-between h-full">
                                <img src={category.strCategoryThumb} alt={category.strCategory} className="w-full h-1/2 object-cover rounded-md" />
                                <h2 className="text-lg text-green-500 font-semibold mt-2">{category.strCategory}</h2>
                                <p className="text-amber-500">{category.strCategoryDescription.substring(0, 100)}...</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;

