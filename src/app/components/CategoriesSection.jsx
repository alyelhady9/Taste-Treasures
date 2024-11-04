"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
                setCategories(response.data.categories.slice(0, 4));
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="w-full text-center flex flex-col items-center  justify-center z-10 relative">
    <div className="w-8/12 max-md:w-11/12 mb-12 ">
        <h1 className="text-2xl text-amber-500 font-bold my-8">Top Recipe Categories</h1>
        <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-2 ">
            {categories.map(category => (
                <Link key={category.idCategory} className="hover:bg-gray-100" href={`/categories/${category.strCategory}`}>
                    <div key={category.idCategory} className="border h-fit min-h-full p-4 rounded-lg shadow-lg inline-block">
                        <img src={category.strCategoryThumb} alt={category.strCategory} className="w-full h-1/2 rounded-md" />
                        <h2 className="text-lg text-green-500 font-semibold mt-2">{category.strCategory}</h2>
                        <p className="text-amber-500">{category.strCategoryDescription.substring(0, 100)}...</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
    <p>Looking for more?</p>
    <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full mt-4">
        <Link href="/categories">View All Categories</Link>
    </button>
</div>

    
    );
};

export default Categories;
