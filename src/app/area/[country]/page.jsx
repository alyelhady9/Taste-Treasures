

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import Image from "next/image"; // <-- Imported the Image component
// import { useParams } from "next/navigation"; // <-- Correct hook for App Router

// const CountryPage = () => {
//     // Correct hook for accessing route parameters in App Router
//     const params = useParams();
//     const country = params.country;

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!country) {
//                 return;
//             }

//             try {
//                 const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
//                 const meals = response.data.meals;

//                 if (!meals) {
//                     setData([]);
//                     setLoading(false);
//                     return;
//                 }

//                 // Create a single array of promises for filtering
//                 const mealDetailsPromises = meals.map(meal =>
//                     axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
//                 );

//                 const mealDetailsResponses = await Promise.all(mealDetailsPromises);
//                 const filteredMeals = mealDetailsResponses
//                     .map(response => response.data.meals[0])
//                     .filter(meal => meal.strCategory !== "Pork");

//                 setData(filteredMeals);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setData([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [country]);

//     if (loading) {
//         return (
//             <div className="mt-24 w-full flex justify-center text-amber-500 font-bold text-lg">
//                 Loading meals from {country}...
//             </div>
//         );
//     }
    
//     if (data.length === 0) {
//         return (
//             <div className="mt-24 w-full flex justify-center text-amber-500 font-bold text-lg">
//                 No meals found for {country}.
//             </div>
//         );
//     }

//     return (
//         <div className="mt-24 w-full flex justify-center">
//             <div className="w-8/12">
//                 <h1 className="text-amber-500 font-bold text-lg">{country} meals</h1>
//                 <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-1">
//                     {data.map((meal) => (
//                         <div key={meal.idMeal} className="border min-h-80 h-full cursor-pointer p-4 rounded-lg shadow-lg">
//                             <Link href={`/recipe/${meal.idMeal}`} className="flex flex-col justify-between items-center gap-4">
//                                 {/* Using the Next.js Image component for optimization */}
//                                 <div className="relative w-full h-40"> {/* Container with defined size for Image */}
//                                   <Image 
//                                     src={meal.strMealThumb} 
//                                     alt={meal.strMeal} 
//                                     fill // <-- Makes the image fill its parent container
//                                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                                     className="object-cover rounded-md" 
//                                   />
//                                 </div>
//                                 <p className="text-lg text-green-500 font-semibold mt-2">{meal.strMeal}</p>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CountryPage;

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image"; // <-- Imported the Image component
import { useParams } from "next/navigation"; // <-- Correct hook for App Router

const CountryPage = () => {
    // Correct hook for accessing route parameters in App Router
    const params = useParams();
    const country = params.country;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!country) {
                return;
            }

            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
                const meals = response.data.meals;

                if (!meals) {
                    setData([]);
                    setLoading(false);
                    return;
                }

                // Create a single array of promises for filtering
                const mealDetailsPromises = meals.map(meal =>
                    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                );

                const mealDetailsResponses = await Promise.all(mealDetailsPromises);
                const filteredMeals = mealDetailsResponses
                    .map(response => response.data.meals[0])
                    .filter(meal => meal.strCategory !== "Pork");

                setData(filteredMeals);
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [country]);

    if (loading) {
        return (
            <div className="mt-2 w-full flex justify-center text-gray-800 font-bold text-lg">
                Loading meals from {country}...
            </div>
        );
    }
    
    if (data.length === 0) {
        return (
            <div className="mt-24 w-full flex justify-center text-gray-800 font-bold text-lg">
                No meals found for {country}.
            </div>
        );
    }

    return (
        <div className="mt-2 w-full select-none">
          <div className="w-8/12 max-md:w-11/12 mx-auto">
            
            {/* Updated Heading Style */}
            <h2 className="text-4xl lg:text-4xl font-extrabold text-gray-800 mb-8 capitalize tracking-tight">
              {country} <span className="text-orange-600">Cuisine</span>
            </h2>
            
            {/* Updated Grid and Card Styles */}
            <div className="grid grid-cols-4 gap-6 mt-4 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full"> 
              {
                data.map(meal => (
                  <Link 
                      href={`/recipe/${meal.idMeal}`} 
                      key={meal.idMeal} 
                      className="group relative block w-full h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform transform hover:-translate-y-4 duration-500 ease-in-out"
                    >
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-left transition-transform duration-500">
                        <h3 className="text-white text-2xl font-bold mb-1 transition-all duration-500 transform translate-y-16 group-hover:translate-y-0 group-hover:text-orange-400">
                          {meal.strMeal}
                        </h3>
                      </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
    );
};

export default CountryPage;