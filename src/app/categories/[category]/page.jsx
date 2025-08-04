"use client";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryPage = (props) => {

  console.log(props);
  const [recipes, setRecipes] = useState([]);
  useEffect (()=> {

    const fetchRecipes = async () => {
            try {
              console.log('Fetching recipes for category:', props.params.category);
              const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${props.params.category}`);
              
              console.log('API Response:', response.data);
              const filteredRecipes = response.data.meals
              setRecipes(filteredRecipes);
            } 
            catch (error) {
              console.log('Error fetching recipes:', error);
            }
          };
          fetchRecipes();
        
  } , [])

  return (
    <div className='bg-orange-50 mt-2 w-full select-none'>
      <div className='w-8/12 max-md:w-11/12 mx-auto'>
        
        {/* The heading now matches the CategoriesSection heading style */}
        <h2 className='text-2xl  font-extrabold text-gray-800 mb-8 capitalize tracking-tight'>
          {props.params.category} <span className="text-orange-600">Recipes</span>
        </h2>
        
        <div className='grid grid-cols-4 gap-6 mt-4 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full'> 
          {
            recipes.map(recipe => (
              <Link 
                    href={`/recipe/${recipe.idMeal}`} 
                    key={recipe.idMeal} 
                    className="group relative block w-full h-80 rounded-2xl overflow-hidden shadow-2xl transition-transform transform hover:-translate-y-4 duration-500 ease-in-out"
                >
                    <Image
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-left transition-transform duration-500">
                        <h3 className="text-white text-2xl font-bold mb-1 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 group-hover:text-orange-400">
                            {recipe.strMeal}
                        </h3>
                    </div>
                </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default CategoryPage;