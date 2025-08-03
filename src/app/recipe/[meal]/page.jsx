"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation"; // <-- Imported the correct hook
// import { a, removeFromWishlist } from "../features/wishlistSlice"
import { addToWishlist, removeFromWishlist } from "@/app/features/wishlistSlice";

const MealDetails = () => { // <-- Removed props from the function signature
    const params = useParams();
    const mealId = params.meal;

    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    
    // Check if the current meal is already in the wishlist
    const isMealInWishlist = wishlistItems.some(item => item.idMeal === mealId);

    useEffect(() => {
        async function fetchMeal() {
            if (!mealId) return;

            setLoading(true);
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                const mealData = response.data.meals?.[0];
                if (mealData) {
                    setMeal(mealData);
                } else {
                    setError("Meal not found.");
                }
            } catch (error) {
                console.error("Error fetching meal details:", error);
                setError("Failed to load meal details. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchMeal();
    }, [mealId]); // <-- Corrected the dependency array to use mealId

    const handleToggleWishlist = () => {
        if (!meal) return;
        
        if (isMealInWishlist) {
            dispatch(removeFromWishlist(meal.idMeal));
        } else {
            const wishlistItem = {
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
            };
            dispatch(addToWishlist(wishlistItem));
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">{error}</div>;
    }

    if (!meal) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Meal not found.</div>;
    }

    return (
        <div className="min-h-screen pt-8 pb-16 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10">

                    {/* Meal Header and Image Section */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center mb-10">
                        {/* Image */}
                        <div className="flex-shrink-0 w-full lg:w-1/3 relative h-80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105">
                            <Image
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Details and Actions */}
                        <div className="mt-8 lg:mt-0 lg:ml-12 w-full lg:w-2/3">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl pr-4 font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 leading-tight">
                                    {meal.strMeal}
                                </h1>
                                <button 
                                    onClick={handleToggleWishlist} 
                                    className={`flex items-center cursor-pointer space-x-2 p-3 rounded-full transition-colors duration-300 ${
                                        isMealInWishlist 
                                            ? 'bg-red-500 text-white hover:bg-red-600' 
                                            : 'bg-red-100 text-red-500 hover:bg-red-200'
                                    }`}
                                >
                                    <FaHeart className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <p className="inline-block text-sm font-semibold text-gray-600 px-4 py-2 rounded-full border border-gray-300">
                                    Category: <Link href={`/categories/${meal.strCategory}`} className="text-orange-600 hover:underline">{meal.strCategory}</Link>
                                </p>
                                <p className="inline-block text-sm font-semibold text-gray-600 px-4 py-2 rounded-full border border-gray-300">
                                    Area: <Link href={`/area/${meal.strArea}`} className="text-orange-600 hover:underline">{meal.strArea}</Link>
                                </p>
                                {meal.strTags && (
                                    <p className="inline-block text-sm font-semibold text-gray-600 px-4 py-2 rounded-full border border-gray-300">
                                        Tags: {meal.strTags.split(',').map(tag => (
                                            <span key={tag} className="ml-1 inline-block bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full text-xs font-medium">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center mt-6">
                                <h4 className="text-xl font-bold text-gray-800">Watch on YouTube:</h4>
                                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="ml-4 transition-transform transform hover:scale-110">
                                    <FaYoutube className="text-red-600 hover:text-red-800 text-4xl" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Ingredients and Instructions Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Ingredients List */}
                        <div className="bg-gray-50 h-fit p-6 rounded-2xl shadow-inner">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">Ingredients</h3>
                            <ul className="list-disc list-inside space-y-3">
                                {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                                    const ingredient = meal[`strIngredient${i}`];
                                    const measure = meal[`strMeasure${i}`];
                                    return ingredient && (
                                        <li key={i} className="text-gray-700">
                                            <span className="font-semibold">{ingredient}</span>
                                            <span className="text-orange-600 ml-2">{measure}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">Instructions</h3>
                            <ol className="list-decimal list-inside space-y-4 text-gray-700">
                                {meal.strInstructions?.split('.').filter(item => item.trim() !== '').map((item, index) => (
                                    <li key={index} className="pl-2">
                                        {item.trim()}.
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MealDetails;