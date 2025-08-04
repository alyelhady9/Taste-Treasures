"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Define the TypeScript interface for a single recipe object
interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
}

const TrendingRecipes = () => {
    // Type the recipes state with the new interface
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrendingRecipes = async () => {
            try {
                // Fetch random meals to simulate trending recipes
                const promises = Array.from({ length: 4 }, () =>
                    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
                );
                const responses = await Promise.all(promises);
                const trendingRecipes = responses.map(response => response.data.meals[0]);
                setRecipes(trendingRecipes);
            } catch (error) {
                console.error("Error fetching trending recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingRecipes();
    }, []);

    // Define responsive configuration for the carousel
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 768, min: 640 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1,
        },
    };

    if (loading) {
        return (
            <div className="w-full text-center py-16">
                <p className="text-gray-500">Loading trending recipes...</p>
            </div>
        );
    }

    return (
        <div className="w-full text-center flex flex-col items-center justify-center py-16 px-4 md:px-8 bg-white">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                Today's <span className="text-red-600">Trending</span> Recipes
            </h2>
            <p className="text-gray-500 mb-12 max-w-2xl">
                Here are some of the most popular dishes people are cooking today.
            </p>
            
            {/* Carousel for small screens */}
            <div className="w-full max-w-7xl md:hidden">
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    itemClass="carousel-item-padding-10-px"
                >
                    {recipes.map((recipe: Recipe) => (
                        <Link
                            key={recipe.idMeal}
                            href={`/recipe/${recipe.idMeal}`}
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
                                <h3 className="text-white text-2xl font-bold mb-1 transition-all duration-500 transform translate-y-16 group-hover:translate-y-0 group-hover:text-red-400">
                                    {recipe.strMeal}
                                </h3>
                                <p className="text-white/90 text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    {recipe.strInstructions.substring(0, 75)}...
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                                View Recipe
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>

            {/* Grid for medium and large screens */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                {recipes.map((recipe: Recipe) => (
                    <Link
                        key={recipe.idMeal}
                        href={`/recipe/${recipe.idMeal}`}
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
                            <h3 className="text-white text-2xl font-bold mb-1 transition-all duration-500 transform translate-y-16 group-hover:translate-y-0 group-hover:text-red-400">
                                {recipe.strMeal}
                            </h3>
                            <p className="text-white/90 text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                {recipe.strInstructions.substring(0, 75)}...
                            </p>
                        </div>
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                            View Recipe
                        </div>
                    </Link>
                ))}
            </div>

            <Link href="/categories">
                <button className="cursor-pointer bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full mt-12 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    View All Recipes
                </button>
            </Link>
        </div>
    );
};

export default TrendingRecipes;