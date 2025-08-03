"use client"

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const CategoriesByCountry = () => {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
                setAreas(response.data.meals); // Corrected to response.data.meals
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        // <div>
        //     <h1>Meal Areas (Countries)</h1>
        //     {areas.map((area, index) => (
        //         <div key={index}>
        //             <Link href={`/area/${area.strArea}`}>
        //                 <p>{area.strArea}</p>
        //             </Link>
        //         </div>
        //     ))}
        // </div>

        <div className="w-full text-center flex justify-center mt-20 z-10 relative">
        <div className="w-8/12 max-md:w-11/12">
            <hr className="w-3/4 border-t-2 m-auto mt-2 border-gray-200" />
            <h1 className="text-2xl text-amber-500 my-6 font-bold">Flavors Around the Globe</h1>
            <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-2">
                {areas.map((area, index) => (
                <div key={index} className="hover:underline">
                    <Link href={`/area/${area.strArea}`}>
                        <p>{area.strArea}</p>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    </div>
    );
}

export default CategoriesByCountry;
