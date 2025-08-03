"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAuthModal } from '../features/authModalSlice'
import { logout } from '../features/authSlice'
import { Search, Filter, X, ChevronDown, Menu, User, LogOut } from 'lucide-react'
import { FaS, FaStar } from 'react-icons/fa6'
import { toggleWishlistModal } from '../features/wishlistModalSlice'

function Header({ onSearchResults, onFiltersChange } : any) {
    const dispatch = useDispatch()
    const userState = useSelector((state:any) => state.auth.user)
    const isLoggedIn = useSelector((state:any) => state.auth.isAuthenticated)
    
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([])
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    
    // const searchRef = useRef(null)
    // const filtersRef = useRef(null)
    // const userMenuRef = useRef(null)

    const searchRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false)

    const handleLogout = () => dispatch(logout())
    const handleAuthModal = () => dispatch(toggleAuthModal())

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
                const data = await response.json();
                setCountries(data.meals);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
        fetchCountries();
    }, []);

    useEffect(() => {
      setMounted(true);
    }, []);


    useEffect(() => {

        if (!mounted) return;

        const fetchMeals = async () => {
            setLoading(true);
            try {
                let url = null;
                let combinedResults = [];


                if (searchQuery) {
                    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`;
                    
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if (data.meals) {
                        combinedResults = data.meals;
                    }
                } 

                else if (selectedCategory) {
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`;
                    
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if (data.meals) {
                        combinedResults = data.meals;
                    }
                } 
                else if (selectedCountry) {
                    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(selectedCountry)}`;
                    
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    if (data.meals) {
                        combinedResults = data.meals;
                    }
                } 

                if (!url) {
                    setMeals([]);
                    onSearchResults?.([]);
                    setLoading(false);
                    return;
                }

                let finalMeals = combinedResults;
                if (selectedCategory && selectedCountry) {
                    const mealDetailsPromises = combinedResults.map(async (meal:any) => {
                        const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                        return await detailResponse.json();
                    });

                    const mealDetailsResponses = await Promise.all(mealDetailsPromises);
                    finalMeals = mealDetailsResponses
                        .map(response => response.meals?.[0])
                        .filter(meal => meal && meal.strArea === selectedCountry);
                }

                // 4. Always filter out Pork meals from the final results
                if (finalMeals.length > 0) {
                     const mealDetailsPromises = finalMeals.map(async (meal: any) => {
                        const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                        return await detailResponse.json();
                    });
                    const mealDetailsResponses = await Promise.all(mealDetailsPromises);
                    finalMeals = mealDetailsResponses
                        .map(response => response.meals?.[0])
                        .filter(meal => meal && meal.strCategory !== "Pork");
                }
                
                setMeals(finalMeals);
                onSearchResults?.(finalMeals);

            } catch (error) {
                console.error("Error fetching meals:", error);
                setMeals([]);
                onSearchResults?.([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchMeals, 300);
        return () => clearTimeout(debounceTimer);

    }, [searchQuery, selectedCategory, selectedCountry, mounted]);

    // Update parent component with filter changes
    useEffect(() => {
        onFiltersChange?.({
            category: selectedCategory,
            country: selectedCountry,
            query: searchQuery
        });
    }, [selectedCategory, selectedCountry, searchQuery]);

    // Close dropdowns when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event:any) => {
    //         if (searchRef.current && !searchRef.current.contains(event.target)) {
    //             setIsSearchOpen(false);
    //         }
    //         if (filtersRef.current && !filtersRef.current.contains(event.target)) {
    //             setIsFiltersOpen(false);
    //         }
    //         if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
    //             setIsUserMenuOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
            if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
                setIsFiltersOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedCountry('');
        setMeals([]);
        onSearchResults?.([]);
    };

    const hasActiveFilters = searchQuery || selectedCategory || selectedCountry;
    const isOpen = useSelector ((state: any) => state.wishlistModal.isOpen)
    const handleWishlistModal = () => { dispatch(toggleWishlistModal())}
    console.log(isOpen)
    return (
        <header className="relative bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 shadow-lg border-b border-orange-100">
            {/* Main Header */}
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="group">
                            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:via-red-700 group-hover:to-orange-800 transition-all duration-300">
                                Taste Treasures
                            </h2>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center ml-8 space-x-8">
                        <Link href="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                            About us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/categories" className="text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 relative group">
                            Categories
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>

                    {/* Search, Filters, and User - Unified for responsiveness */}
                    <div className="flex-1 flex justify-end lg:justify-center items-center space-x-2 md:space-x-4 lg:space-x-8">
                        {/* Search and Filters - Desktop */}
                        <div className="hidden lg:flex flex-1 max-w-2xl items-center space-x-4">
                            <div ref={searchRef} className="relative flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search recipes..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchOpen(true)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-orange-200 rounded-full shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                                    {loading && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                </div>
                                {isSearchOpen && meals.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-orange-100 max-h-80 overflow-y-auto z-50">
                                        {meals.slice(0, 5).map((meal: any) => (
                                            <div key={meal.idMeal} className="p-3 hover:bg-orange-50 cursor-pointer border-b border-orange-50 last:border-b-0 flex items-center space-x-3">
                                                <Link href={`/recipe/${meal.idMeal}`} className="flex items-center space-x-3 w-full" onClick={() => setIsSearchOpen(false)}>
                                                    <img src={meal.strMealThumb} alt={meal.strMeal} className="w-12 h-12 rounded-lg object-cover" />
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">{meal.strMeal}</h4>
                                                        <p className="text-sm text-gray-500">{meal.strCategory} • {meal.strArea}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                        {meals.length > 5 && (
                                            <div className="p-3 text-center text-sm text-gray-500 bg-orange-50">
                                                +{meals.length - 5} more results
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div ref={filtersRef} className="relative">
                                <button
                                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-full border transition-all duration-200 ${
                                        hasActiveFilters
                                            ? 'bg-orange-100 border-orange-300 text-orange-700'
                                            : 'bg-white border-orange-200 text-gray-700 hover:bg-orange-50'
                                    }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span className="font-medium">Filters</span>
                                    {hasActiveFilters && (
                                        <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                            {[searchQuery, selectedCategory, selectedCountry].filter(Boolean).length}
                                        </span>
                                    )}
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFiltersOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isFiltersOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-orange-100 z-50">
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="font-semibold text-gray-800">Filter Recipes</h3>
                                                {hasActiveFilters && (
                                                    <button
                                                        onClick={clearFilters}
                                                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                                                    >
                                                        Clear all
                                                    </button>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                                <select
                                                    value={selectedCategory}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    className="w-full p-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
                                                >
                                                    <option value="">All Categories</option>
                                                    {categories.map((category: any) => (
                                                        <option key={category.idCategory} value={category.strCategory}>
                                                            {category.strCategory}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
                                                <select
                                                    value={selectedCountry}
                                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                                    className="w-full p-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
                                                >
                                                    <option value="">All Cuisines</option>
                                                    {countries.map((country: any) => (
                                                        <option key={country.strArea} value={country.strArea}>
                                                            {country.strArea}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Search & Filters (collapsed) */}
                        <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="cursor-pointer p-2 rounded-lg text-gray-700 hover:bg-orange-100 transition-colors duration-200"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className=" cursor-pointer p-2 rounded-lg text-gray-700 hover:bg-orange-100 transition-colors duration-200"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* User Menu & Mobile Menu Button */}
                        <div className="flex items-center space-x-4">
                            <div ref={userMenuRef} className="relative">
                                {mounted && (
                                    isLoggedIn ? (
                                        <div>
                                            <button
                                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                                className="cursor-pointer flex items-center space-x-2 p-2 rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors duration-200"
                                            >
                                                <User className="w-5 h-5" />
                                                <span className="hidden lg:inline font-medium">{userState?.name || 'User'}</span>
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isUserMenuOpen && (
                                                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-orange-100 z-50">
                                                    <div className="p-2">
                                                        <button
                                                            onClick={handleLogout}
                                                            className="cursor-pointer w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                                                        >
                                                            <LogOut className="w-4 h-4" />
                                                            <span>Log out</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleAuthModal}
                                            className="cursor-pointer px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            Sign in
                                        </button>
                                    )
                                )}
                                {!mounted && <div className="h-10 w-24"></div>}
                            </div>

                            {
                                isLoggedIn &&
                                <div 
                                    onClick={handleWishlistModal}
                                    className="
                                        p-3 
                                        bg-amber-100 
                                        text-orange-700 
                                        rounded-full 
                                        shadow-lg 
                                        cursor-pointer 
                                        hover:bg-amber-200 
                                        hover:text-amber-600 
                                        hover:scale-110 
                                        transition-all 
                                        duration-300 
                                        ease-in-out
                                    "
                                >
                                    <FaStar className="w-5 h-5" />
                             </div>
                            }

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="cursor-pointer lg:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-100 transition-colors duration-200"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Dropdown (toggled) */}
                {isSearchOpen && (
                    <div ref={searchRef} className="lg:hidden px-4 pb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-orange-200 rounded-full shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                            {loading && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        {meals.length > 0 && (
                            <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-lg shadow-xl border border-orange-100 max-h-80 overflow-y-auto z-50">
                                {meals.slice(0, 5).map((meal: any) => (
                                    <div key={meal.idMeal} className="p-3 hover:bg-orange-50 cursor-pointer border-b border-orange-50 last:border-b-0 flex items-center space-x-3">
                                        <Link href={`/recipe/${meal.idMeal}`} className="flex items-center space-x-3 w-full" onClick={() => setIsSearchOpen(false)}>
                                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-12 h-12 rounded-lg object-cover" />
                                            <div>
                                                <h4 className="font-medium text-gray-800">{meal.strMeal}</h4>
                                                <p className="text-sm text-gray-500">{meal.strCategory} • {meal.strArea}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                {meals.length > 5 && (
                                    <div className="p-3 text-center text-sm text-gray-500 bg-orange-50">
                                        +{meals.length - 5} more results
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                
                {/* Mobile Filters Dropdown (toggled) */}
                {isFiltersOpen && (
                    <div ref={filtersRef} className="lg:hidden px-4 pb-4">
                        <div className="w-full bg-white rounded-lg shadow-xl border border-orange-100 z-50">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-800">Filter Recipes</h3>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full p-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((category: any) => (
                                            <option key={category.idCategory} value={category.strCategory}>
                                                {category.strCategory}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="w-full p-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
                                    >
                                        <option value="">All Cuisines</option>
                                        {countries.map((country: any) => (
                                            <option key={country.strArea} value={country.strArea}>
                                                {country.strArea}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Navigation Menu (toggled) */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-orange-100 shadow-lg">
                        <div className="px-4 py-4 space-y-2">
                            <Link
                                href="/about"
                                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors duration-200 font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About us
                            </Link>
                            <Link
                                href="/categories"
                                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors duration-200 font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Categories
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Active Filters Bar */}
            {hasActiveFilters && (
                <div className="bg-orange-50 border-t border-orange-100 px-4 py-3">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">Active filters:</span>
                            <div className="flex items-center space-x-2">
                                {searchQuery && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                        Search: "{searchQuery}"
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="ml-2 hover:bg-orange-200 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedCategory && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        {selectedCategory}
                                        <button
                                            onClick={() => setSelectedCategory('')}
                                            className="ml-2 hover:bg-red-200 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedCountry && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {selectedCountry}
                                        <button
                                            onClick={() => setSelectedCountry('')}
                                            className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            {meals.length} recipe{meals.length !== 1 ? 's' : ''} found
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header