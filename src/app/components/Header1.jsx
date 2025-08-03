"use client";
import { useState } from "react";
import Link from "next/link";
import SearchMeals from "./SearchBar";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";


const Header1 = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [clicked, setClicked] = useState(false);


    const closeClicked = () => {
        setClicked(false);
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
        setClicked(false); // Close the search when the menu is toggled
    };

    return (
        <header className="select-none backdrop-blur-lg fixed w-full z-40 top-0 flex items-center py-4 px-8 justify-between  shadow-lg transition-all duration-300">
            <div className="flex items-center max-md:w-full w-1/3 max-lg:w-1/2 justify-between">

                <h1 className="text-2xl max-md:w-full font-bold text-amber-500">
                    <Link href="/">Taste Treasures</Link>
                </h1>

                <nav className={`hidden md:flex items-center  text-gray-800 justify-between gap-8 transition-opacity duration-300 ${clicked ? "opacity-0" : "opacity-100"}`}>
                    <Link className="hover:text-gray-600" href="/categories">Categories</Link>
                    <Link className="hover:text-gray-600" href="/about">About us</Link>
                </nav>
            </div>

            <div className=" flex gap-4 items-center">
                {/* <SearchMeals setFilteredMeals={setFilteredMeals} setClicked={setClicked} /> */}
                <div className="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold p-2 rounded-md">
                    <Link href="/search">
                        
                        <IoIosSearch />
                    </Link>

                </div>
               
                <button 
                    onClick={toggleMenu} 
                    className="md:hidden text-2xl z-30 ml-2">
                    {menuOpen ? <IoIosClose /> : <IoIosMenu />}
                </button>
            </div>

            {/* { menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-white z-10 p-4 shadow-lg md:hidden transition-all duration-300">
                    <nav className="flex flex-col items-start gap-4">
                        <Link className="w-full" href="/categories" onClick={toggleMenu}>Categories</Link>
                        <Link className="w-full" href="/about" onClick={toggleMenu}>About us</Link>
                        <button 
                            onClick={closeClicked} 
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full">
                            Sign in
                        </button>
                    </nav>
                </div>
            )} */}
            <div className={`md:hidden fixed top-0 left-0 w-full bg-white px-8 transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-16' : '-translate-y-full'} z-10`}>
                <nav className="flex text-gray-800 flex-col items-start justify-start w-full gap-4 p-4">
                    <Link className="w-full hover:text-gray-600" href="/categories" onClick={toggleMenu}>Categories</Link>
                    <Link className="w-full hover:text-gray-600" href="/about" onClick={toggleMenu}>About us</Link>
                    <div className="w-full flex items-center justify-center">
                       
               
                    </div>
                </nav>
            </div>

        </header>
    );
}

export default Header1;
