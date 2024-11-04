"use client";

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryPage = (props) => {
  // const router = useRouter();
  // const [category, setCategory] = useState(null);
  // const [recipes, setRecipes] = useState([]);

  // useEffect(() => {
  //   const query = new URLSearchParams(window.location.search);
  //   const categoryParam = query.get('category');
  //   console.log('Category from URL:', categoryParam); // Debugging log
  //   setCategory(categoryParam);
  // }, []);

  // useEffect(() => {
  //   console.log('Category state:', category); // Debugging log
  //   if (category) {
  //     const fetchRecipes = async () => {
  //       try {
  //         console.log('Fetching recipes for category:', category); // Debugging log
  //         const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  //         console.log('API Response:', response.data); // Debugging log
  //         setRecipes(response.data.meals);
  //       } catch (error) {
  //         console.log('Error fetching recipes:', error);
  //       }
  //     };
  //     fetchRecipes();
  //   }
  // }, [category]);

  // if (!category) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div className="w-full text-center flex justify-center z-10 relative">
  //     <div className="w-8/12 max-md:w-11/12">
  //       <hr className="w-3/4 border-t-2 m-auto mt-2 border-amber-500" />
  //       <h1 className="text-2xl text-amber-500 font-bold">{category} Recipes</h1>
  //       <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-1">
  //         {recipes.map(recipe => (
  //           <Link key={recipe.idMeal} href={`/recipe/${recipe.idMeal}`}>
  //             <div className="border p-4 rounded-lg shadow-lg cursor-pointer">
  //               <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-32 object-cover rounded-md" />
  //               <h2 className="text-lg text-green-500 font-semibold mt-2">{recipe.strMeal}</h2>
  //             </div>
  //           </Link>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
  console.log(props);
  const [recipes, setRecipes] = useState([]);
  useEffect (()=> {

    const fetchRecipes = async () => {
            try {
              console.log('Fetching recipes for category:', props.params.category); // Debugging log
              const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${props.params.category}`);
              
              console.log('API Response:', response.data); // Debugging log
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
    <div className='mt-24 w-full select-none'>
      <div className='w-8/12 max-md:w-11/12 mx-auto'>

          <h2 className='text-amber-500 text-2xl font-bold'>

            {props.params.category}
          </h2>
        <div className='grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full'> 

        {
          recipes.map(recipe => (
            <Link href={`/recipe/${recipe.idMeal}`} className='max-md:w-full'>
            <div className='p-4 rounded-lg shadow-lg w-full flex flex-col items-center h-full justify-between cursor-pointer'>
                <img className='text-center' src={recipe.strMealThumb} alt={recipe.strMeal} width={300} height={300} />
                <h2 className="text-lg text-green-500 font-semibold mt-2">{recipe.strMeal}</h2>
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
