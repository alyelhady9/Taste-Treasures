

// "use client"
// import axios from "axios";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Flag from 'react-flagkit';

// const CategoriesByCountry = () => {
//     const [areas, setAreas] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
//                 setAreas(response.data.meals);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-40">
//                 <p className="text-gray-500">Loading countries...</p>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full text-center flex flex-col items-center justify-center py-16 px-4 md:px-8 bg-orange-50">
//             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
//                 <span className="text-orange-600">Flavors</span> Around the Globe
//             </h2>
//             <p className="text-gray-500 mb-12 max-w-2xl">
//                 Explore a variety of recipes by their country of origin.
//             </p>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-7xl">
//                 {areas.map((area) => (
//                     <Link
//                         key={area.strArea}
//                         href={`/area/${area.strArea}`}
//                         className="group flex flex-col items-center p-4 rounded-2xl shadow-lg bg-white hover:bg-orange-100 transition-all duration-300 transform hover:-translate-y-2"
//                     >
//                         {/* Flag Kit component to get a flag by country name */}
//                         <Flag
//                             country={area.strArea === 'United States' ? 'US' : area.strArea.substring(0, 2).toUpperCase()}
//                             className="w-16 h-16 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
//                         />
//                         <p className="mt-4 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
//                             {area.strArea}
//                         </p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default CategoriesByCountry;



"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import Flag from 'react-flagkit';

interface Area {
    strArea: string;
}

const CategoriesByCountry = () => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
                setAreas(response.data.meals || []);
            } catch (error) {
                console.error("Error fetching country data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Loading countries...</p>
            </div>
        );
    }

    return (
        <div className="w-full text-center flex flex-col items-center justify-center py-16 px-4 md:px-8 bg-orange-50">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                <span className="text-orange-600">Flavors</span> Around the Globe
            </h2>
            <p className="text-gray-500 mb-12 max-w-2xl">
                Explore a variety of recipes by their country of origin.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-7xl">
                {areas.map((area: Area) => (
                    <Link
                        key={area.strArea}
                        href={`/area/${area.strArea}`}
                        className="group flex flex-col items-center p-4 rounded-2xl shadow-lg bg-white hover:bg-orange-100 transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <Flag
                            country={area.strArea === 'United States' ? 'US' : area.strArea.substring(0, 2).toUpperCase()}
                            className="w-16 h-16 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
                        />
                        <p className="mt-4 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
                            {area.strArea}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesByCountry;