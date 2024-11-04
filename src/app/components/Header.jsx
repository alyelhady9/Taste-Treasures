"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { IoIosMenu, IoIosClose } from "react-icons/io";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [hidden, setHidden] = useState("");

    const closeClicked = () => {
        setMenuOpen(!menuOpen);
        setClicked(!clicked);
        if (clicked === true) {
            
            setHidden("hidden");
        }else {
            
            setHidden("");
        }
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        console.log("Menu Open State:", !menuOpen);
    };

    return (
        <header className="select-none w-full p-4 gap-2 z-20 fixed top-24 backdrop-blur-lg flex justify-between items-center text-black">
            <div className="w-3/12 max-md:w-5/12 flex-shrink-0 z-30">
                <h1 className="text-xl text-amber-500 font-bold w-full" onClick={closeClicked}>
                    <Link href="/">Taste Treasures</Link>
                </h1>
            </div>

            <nav className={`hidden md:flex ${hidden} justify-between gap-4 w-5/12 items-center z-30`}>
                <Link className="w-1/2" href="/categories">Categories</Link>
                <Link className="w-1/2" href="/about">About us</Link>
            </nav>

            <div className="w-full hidden md:block md:w-full">
                <SearchBar clicked={clicked} setClicked={setClicked} closeClicked={closeClicked}/>
            </div>

            <button onClick={toggleMenu} className="md:hidden text-2xl z-30">
                {menuOpen ? <IoIosClose /> : <IoIosMenu />}
            </button>

            <div className={`fixed top-0 left-0 w-full bg-white transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-12' : '-translate-y-full'} z-10`}>
                <nav className="flex flex-col items-start justify-start w-full gap-4 p-4">
                    <Link className="w-full" href="/categories" onClick={toggleMenu}>Categories</Link>
                    <Link className="w-full" href="/about" onClick={toggleMenu}>About us</Link>
                    <div className="w-full">
                        <SearchBar clicked={clicked} setClicked={setClicked} closeClicked={closeClicked} />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
