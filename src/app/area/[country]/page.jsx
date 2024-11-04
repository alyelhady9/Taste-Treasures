"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const CountryPage = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${props.params.country}`);
                const meals = response.data.meals;

                // Fetch details for each meal to filter out pork meals
                const mealDetailsPromises = meals.map(meal => 
                    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                );

                const mealDetailsResponses = await Promise.all(mealDetailsPromises);
                const filteredMeals = mealDetailsResponses
                    .map(response => response.data.meals[0])
                    .filter(meal => meal.strCategory !== "Pork");

                setData(filteredMeals);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [props.params.country]);

    return (
        <div className="mt-24 w-full flex justify-center">
            <div className="w-8/12">
                <h1 className="text-amber-500 font-bold text-lg">{props.params.country} meals</h1>
                <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                    {data.map((meal) => (
                        <div key={meal.idMeal} className="border min-h-80 h-full cursor-pointer p-4 rounded-lg shadow-lg">
                            <Link href={`/recipe/${meal.idMeal}`} className="flex flex-col justify-between items-center gap-4">
                                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-1/2 object-cover rounded-md" />
                                <p className="text-lg text-green-500 font-semibold mt-2">{meal.strMeal}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


}

export default CountryPage;
