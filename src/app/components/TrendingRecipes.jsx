"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import FeaturedRecipe from "./featuredRecipe";

const TrendingRecpies = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => { 
            try{
                const recipPromises = Array.from({length: 8}, (_, i) => axios.get("https://www.themealdb.com/api/json/v1/1/random.php"));
                const recipeResponses = await Promise.all(recipPromises);
                const recipeData = recipeResponses.map(response => response.data.meals[0]) .filter(recipe => !recipe.strCategory.toLowerCase().includes("pork"));;
                setRecipes(recipeData);
            
            }
            catch (error) {
                console.log(error);
        }
    }
    fetchData()
},[])
    return ( 
        
    <div className="w-full text-center flex justify-center z-10 relative pb-12 bg-gray-100">
        <div className="w-8/12 overflow-hidden  max-md:w-11/12">

            
            <h1 className="text-2xl text-amber-500 font-bold my-8  ">Trending Recipes</h1>
            <div>
                <div className="grid grid-cols-4 w-full gap-4 mt-4 
                max-lg:grid-cols-2
                max-md:flex
                max-md:overflow-scroll max-md:w-[23rem]
                scrollbar-hidden
                
                ">
                
                    {recipes.map(recipe => (
                        
                        <FeaturedRecipe key={recipe.idMeal}  idMeal = {recipe.idMeal} strMeal ={recipe.strMeal} strMealThumb = {recipe.strMealThumb}/>
                    ))}
                </div>
            </div>
        </div>
    </div> 
    
);
}
 
export default TrendingRecpies;