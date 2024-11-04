"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

const mealDetails = (props) => {
    const [meal, setMeal] = useState({});
    useEffect(() => {
        async function fetchMeal() { 

            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.params.meal}`)
                setMeal(response.data.meals[0])
            } catch (error) { console.log(error) }
        }
        fetchMeal();

    }, [props.params.meal])
    return ( <div className="mt-16">
    
        {meal.strMeal && (
                <div className="w-full">
                    <div className="w-8/12 max-md:w-full max-md:px-8 mx-auto bg-gray-100 p-6 rounded-lg text-gray-700">
                        <div className="flex mb-6 max-md:flex-col max-md:items-center ">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-1/4 max-md:w-1/2  rounded-lg" />
                            <div className="ml-7 max-md:ml-0">

                                <h2 className="text-xl font-bold my-4 mx-auto text-amber-500">{meal.strMeal}</h2>
                                <p><strong  className="text-amber-500 font-bold text-lg">Category:</strong> <button className="bg-amber-500 text-white px-2 py-1 rounded-md hover:bg-amber-600" ><Link href={`/categories/${meal.strCategory}`}>{meal.strCategory}</Link></button></p>
                                <p><strong  className="text-amber-500 font-bold text-lg">Area:</strong>  <Link className="hover:underline" href={`/area/${meal.strArea}`}>{meal.strArea}</Link></p>
                                {
                                    meal.strTags !== null &&
                                <p><strong  className="text-amber-500 font-bold text-lg">Tags:</strong> {meal.strTags}</p>
                                }
                            </div>

                        </div>

                        <p><strong className="text-amber-500 font-bold text-lg mb-2">Ingredients:</strong></p>
                        <ul>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                                const ingredient = meal[`strIngredient${i}`];
                                const measure = meal[`strMeasure${i}`];
                                return ingredient ? <li key={i} className="mb-2">{i}- {ingredient} - <span className="text-amber-500"> {measure}</span></li> : null;
                            })}
                        </ul>
                        <hr className="border-t-2 border-gray-300 my-6"/>
                        <p><strong  className="text-amber-500 font-bold text-lg">Instructions:</strong> {meal.strInstructions.split(".").map((item, index) => <div className="mb-2" key={index}>{item}.</div>)}</p>
                        <p className="flex items-center"><strong>Youtube:</strong> <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="ml-4"><FaYoutube className=" text-red-500 hover:text-red-700 text-3xl"  /></a></p>
                    </div>
                </div>
            )}
    </div> );
}
 
export default mealDetails;