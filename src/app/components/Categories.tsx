
"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}
const Categories = () => {
   
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
                // The API returns the categories in `response.data.categories`
                setCategories(response.data.categories || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories.");
                setLoading(false);
            }
        };
    
        fetchCategories();
    }, []);

 
    if (loading) {
        return <div className="text-center mt-8">Loading categories...</div>;
    }
    
    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="w-full text-center flex flex-col items-center justify-center py-16 px-4 md:px-8 bg-orange-50">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                All <span className="text-orange-600">Recipe</span> Categories
            </h2>
            <p className="text-gray-500 mb-12 max-w-2xl">
                Browse our full collection of categories to find your next great meal.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                {categories.map(category => (
                    <Link
                        key={category.idCategory}
                        href={`/categories/${category.strCategory}`}
                        className="group relative block w-full h-60 rounded-2xl overflow-hidden shadow-2xl transition-transform transform hover:-translate-y-4 duration-500 ease-in-out"
                    >
                        <Image
                            src={category.strCategoryThumb}
                            alt={category.strCategory}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/90 transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-left transition-transform duration-500">
                            <h3 className="text-white text-2xl font-bold mb-1 transition-all duration-500 transform translate-y-16 group-hover:translate-y-0 group-hover:text-orange-400">
                                {category.strCategory}
                            </h3>
                            <p className="text-white/90 text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                {category.strCategoryDescription.substring(0, 75)}...
                            </p>
                        </div>
                        <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                            Explore
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;

