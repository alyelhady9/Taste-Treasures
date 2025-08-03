// "use client"



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';

// const Recipes = () => {
//   const [meals, setMeals] = useState([]);

//   useEffect(() => {
//     const fetchRandomMeals = async () => {
//         try {
//           const mealPromises = Array.from({ length: 4 }, () =>
//             axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
//           );
//           const mealResponses = await Promise.all(mealPromises);
//           const randomMeals = mealResponses.map(response => response.data.meals[0]);
//           setMeals(randomMeals);
//         } catch (error) {
//           console.error('Error fetching the meals:', error);
//         }
//       };
  
//       fetchRandomMeals();
//     }, []);
  
//     return (
//       <div className='w-full flex justify-center cursor-pointer mt-12' >
//         <div className='w-5/12 grid grid-cols-2 gap-4  justify-center '>

//         {meals.map(meal => (
          
//             <div className='flex items-center p-4 gap-2 cursor-pointer bg-amber-100  rounded-lg  ' key={meal.idMeal} >
//                 <h3 className='w-1/3 text-lg font-semibold'>{meal.strMeal}</h3>
//                 <img className='w-2/3 rounded-lg' src={meal.strMealThumb} alt={meal.strMeal} />
//           </div>
//         ))}
//         </div>
//       </div>
//   );
// };

// export default Recipes;


"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Define the TypeScript interface for a single meal object
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Recipes = () => {
  // Type the meals state with the new interface
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchRandomMeals = async () => {
      try {
        const mealPromises = Array.from({ length: 4 }, () =>
          axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        );
        const mealResponses = await Promise.all(mealPromises);
        const randomMeals = mealResponses.map(response => response.data.meals[0]);
        setMeals(randomMeals);
      } catch (error) {
        console.error('Error fetching the meals:', error);
      }
    };
  
    fetchRandomMeals();
  }, []);
  
  return (
    <div className='w-full flex justify-center cursor-pointer mt-12'>
      <div className='w-5/12 grid grid-cols-2 gap-4 justify-center'>
        {meals.map((meal: Meal) => (
          <Link
            key={meal.idMeal}
            href={`/recipe/${meal.idMeal}`}
            className='flex items-center p-4 gap-2 cursor-pointer bg-amber-100 rounded-lg'
          >
            <h3 className='w-1/3 text-lg font-semibold'>{meal.strMeal}</h3>
            <img className='w-2/3 rounded-lg' src={meal.strMealThumb} alt={meal.strMeal} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recipes;