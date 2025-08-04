"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bg from '../../../public/assets/backgrounds/background.jpeg';
import CategoriesSection from './CategoriesSection';
import TrendingRecipes from './TrendingRecipes';

function MainPage() {
    return (
        <div className="flex flex-col w-full select-none text-gray-700 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center">
                <Image
                    fill
                    className="object-cover transition-transform duration-[25s] ease-out hover:scale-110"
                    src={bg}
                    alt="Culinary Background"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/50 via-orange-500/50 to-yellow-400/50" />
                <div className="absolute inset-0 z-20">
                    <div className="absolute top-20 left-10 w-2 h-2 bg-white/60 rounded-full animate-ping" />
                    <div className="absolute top-40 right-20 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
                </div>
                <div className="relative z-30 flex flex-col justify-center items-center min-h-screen px-6 md:px-10">
                    <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 shadow-lg p-8 md:p-12 max-w-4xl w-full text-center transform transition-all duration-1000">
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 animate-pulse drop-shadow-2xl">
                            Find, Cook, Enjoy!
                        </h1>
                        <p className="text-base md:text-xl lg:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                            Unlock the Secrets of
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 font-extrabold pl-2">Culinary Excellence</span>:
                            Explore Thousands of Recipes, Master New Techniques, and Delight Your Taste Buds with Every Meal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                            <Link href="/categories" passHref legacyBehavior>
                                <div className="cursor-pointer relative group overflow-hidden bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-red-500/50">
                                    <span className="relative z-10">Explore Recipes</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full group-hover:animate-ping" />
                                </div>
                            </Link>
                            <Link href={'https://youtube.com'} >
                                <button className="cursor-pointer relative group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white/20">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 group-hover:animate-spin" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Watch Demo
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div className="flex justify-center gap-8 md:gap-16 mt-12 pt-8 border-t border-white/20">
                            <div className="text-center group">
                                <div className="text-3xl md:text-4xl font-bold text-orange-400 group-hover:scale-110 transition-transform duration-300">10K+</div>
                                <div className="text-sm text-white/70">Recipes</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-3xl md:text-4xl font-bold text-red-500 group-hover:scale-110 transition-transform duration-300">50+</div>
                                <div className="text-sm text-white/70">Cuisines</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-3xl md:text-4xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">24/7</div>
                                <div className="text-sm text-white/70">Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TrendingRecipes />
            <CategoriesSection />
        </div>
    );
}

export default MainPage;