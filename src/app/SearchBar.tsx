

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { IoIosSearch } from "react-icons/io";

// const SearchBar = ({ clicked, setClicked, closeClicked, menuOpen, setMenuOpen }) => {
//     const [categories, setCategories] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [selectedCountry, setSelectedCountry] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [meals, setMeals] = useState([]);
//     const [filteredMeals, setFilteredMeals] = useState([]);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
//                 setCategories(response.data.categories);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         const fetchCountries = async () => {
//             try {
//                 const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
//                 setCountries(response.data.meals);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchCategories();
//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         const fetchMeals = async () => {
//             try {
//                 let url = "https://www.themealdb.com/api/json/v1/1/filter.php?";
//                 if (selectedCategory) {
//                     url += `c=${selectedCategory}&`;
//                 }
//                 if (selectedCountry) {
//                     url += `a=${selectedCountry}&`;
//                 }
//                 if (!selectedCategory && !selectedCountry) {
//                     url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
//                 }
//                 const response = await axios.get(url);

//                 // Fetch details for each meal to filter out pork meals
//                 const mealDetailsPromises = response.data.meals.map(meal => 
//                     axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
//                 );

//                 const mealDetailsResponses = await Promise.all(mealDetailsPromises);
//                 const filteredMeals = mealDetailsResponses
//                     .map(response => response.data.meals[0])
//                     .filter(meal => meal.strCategory !== "Pork");

//                 setMeals(filteredMeals);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchMeals();
//     }, [selectedCategory, selectedCountry]);

//     useEffect(() => {
//         const filterMeals = () => {
//             if (searchTerm) {
//                 const filtered = meals.filter(meal =>
//                     meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
//                 );
//                 setFilteredMeals(filtered);
//             } else {
//                 setFilteredMeals(meals);
//             }
//         };

//         filterMeals();
//     }, [searchTerm, meals]);

//     const handleClick = () => {
//         setMenuOpen(!menuOpen);
//         setClicked(!clicked);
//     };

//     return (
//         <div className="w-8/12 mt-24 flex justify-end items-center">
//             {clicked === false ? (
//                 <button onClick={closeClicked} className="bg-green-500 text-white p-2 text-lg rounded-md">
//                     <IoIosSearch />
//                 </button>
//             ) : (
//                 <div className="w-full">
//                     <div className="flex max-md:flex-col gap-4 w-full space-x-4">
//                         <input
//                             type="text"
//                             placeholder="Search by meal name"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="border p-2 rounded w-8/12 max-md:w-full focus:outline-none focus:border-b-4 focus:border-b-amber-500"
//                         />
//                         <div className="w-4/12 max-md:w-full flex gap-4">

//                             <select className="w-6/12 border border-amber-500 text-amber-500 bg-white rounded p-2 focus:outline-none" 
//                                     onChange={(e) => setSelectedCategory(e.target.value)} 
//                                     value={selectedCategory}>
//                                 <option value="">Select Category</option>
//                                 {categories.map((category) => (
//                                     <option key={category.idCategory} value={category.strCategory}>
//                                         {category.strCategory}
//                                     </option>
//                                 ))}
//                             </select>
//                             <select className="w-6/12 border border-amber-500 text-amber-500 bg-white rounded p-2 focus:outline-none" 
//                                     onChange={(e) => setSelectedCountry(e.target.value)} 
//                                     value={selectedCountry}>
//                                 <option value="">Select Country</option>
//                                 {countries.map((country, index) => (
//                                     <option key={index} value={country.strArea}>
//                                         {country.strArea}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 overflow-y-scroll h-[40rem] scrollbar-hidden">
//                         {filteredMeals.length > 0 ? (
//                             filteredMeals.map((meal) => (
//                                 <div key={meal.idMeal} className="border  h-fit cursor-pointer p-4 rounded-lg shadow-lg">
//                                     <Link className="flex flex-col items-center justify-between gap-4 h-full" 
//                                           href={`/recipe/${meal.idMeal}`} 
//                                           onClick={handleClick}>
//                                         <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-32 object-cover rounded-md" />
//                                         <p className="text-lg text-green-500 font-semibold mt-2">{meal.strMeal}</p>
//                                     </Link>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No meals found</p>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SearchBar;




"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ clicked, setClicked, closeClicked }) => {
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [meals, setMeals] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState([]);

    // Fetch categories and countries on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
                setCategories(response.data.categories);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
                setCountries(response.data.meals);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
        fetchCountries();
    }, []);

    // Fetch meals based on selected category and country
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                let url;
                if (selectedCategory && selectedCountry) {
                    // The API doesn't support filtering by both category and area at the same time.
                    // A single-filter approach is more practical here.
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
                } else if (selectedCategory) {
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
                } else if (selectedCountry) {
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`;
                } else {
                    // Default to searching all meals if no filters are applied
                    url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
                }
                
                const response = await axios.get(url);

                if (response.data.meals) {
                    // Fetch details for each meal to filter out pork meals
                    const mealDetailsPromises = response.data.meals.map(meal =>
                        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                    );

                    const mealDetailsResponses = await Promise.all(mealDetailsPromises);
                    const filteredMeals = mealDetailsResponses
                        .map(response => response.data.meals?.[0])
                        .filter(meal => meal && meal.strCategory !== "Pork");

                    setMeals(filteredMeals);
                } else {
                    setMeals([]);
                }
            } catch (error) {
                console.log(error);
                setMeals([]);
            }
        };

        fetchMeals();
    }, [selectedCategory, selectedCountry]);

    // Filter meals by search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = meals.filter(meal =>
                meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMeals(filtered);
        } else {
            setFilteredMeals(meals);
        }
    }, [searchTerm, meals]);

    return (
        <div className="w-full bg-white flex justify-end items-center">
            {clicked ? (
                <div className="w-full">
                    <div className="flex h-screen  max-md:flex-col gap-4 w-full">
                        <input
                            type="text"
                            placeholder="Search by meal name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-2 rounded w-8/12 max-md:w-full focus:outline-none focus:border-b-4 focus:border-b-amber-500"
                        />
                        <div className="w-4/12 max-md:w-full flex gap-4">
                            <select
                                className="w-6/12 border border-amber-500 text-amber-500 bg-white rounded p-2 focus:outline-none"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                value={selectedCategory}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.idCategory} value={category.strCategory}>
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="w-6/12 border border-amber-500 text-amber-500 bg-white rounded p-2 focus:outline-none"
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                value={selectedCountry}
                            >
                                <option value="">Select Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.strArea}>
                                        {country.strArea}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 overflow-y-scroll h-[40rem] scrollbar-hidden">
                        {filteredMeals.length > 0 ? (
                            filteredMeals.map((meal) => (
                                <div key={meal.idMeal} className="border h-fit cursor-pointer p-4 rounded-lg shadow-lg">
                                    <Link
                                        className="flex flex-col items-center justify-between gap-4 h-full"
                                        href={`/recipe/${meal.idMeal}`}
                                        onClick={() => setClicked(false)}
                                    >
                                        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-32 object-cover rounded-md" />
                                        <p className="text-lg text-green-500 font-semibold mt-2">{meal.strMeal}</p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No meals found</p>
                        )}
                    </div>
                </div>
            ) : (
                <button onClick={closeClicked} className="bg-green-500 text-white p-2 text-lg rounded-md">
                    <IoIosSearch />
                </button>
            )}
        </div>
    );
};

export default SearchBar;