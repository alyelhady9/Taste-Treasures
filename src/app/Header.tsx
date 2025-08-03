// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import SearchBar from "./SearchBar";
// import { IoIosMenu, IoIosClose } from "react-icons/io";

// const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [clicked, setClicked] = useState(false);
//     const [hidden, setHidden] = useState("");

//     const closeClicked = () => {
//         setMenuOpen(!menuOpen);
//         setClicked(!clicked);
//         if (clicked === true) {
//             setHidden("hidden");
//         } else {
//             setHidden("");
//         }
//     }

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//         console.log("Menu Open State:", !menuOpen);
//     };

//     return (
//         <header className="select-none w-full p-4 gap-2 z-20 fixed top-0 backdrop-blur-lg bg-white/90 shadow-sm flex justify-between items-center text-black">
//             {/* Logo Section */}
//             <div className="w-3/12 max-md:w-5/12 flex-shrink-0 z-30">
//                 <h1 className="text-xl text-amber-500 font-bold w-full" onClick={closeClicked}>
//                     <Link href="/" className="hover:text-amber-600 transition-colors">
//                         Taste Treasures
//                     </Link>
//                 </h1>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className={`hidden md:flex ${hidden} justify-center gap-8 w-auto items-center z-30`}>
//                 <Link className="hover:text-amber-500 transition-colors font-medium" href="/categories">
//                     Categories
//                 </Link>
//                 <Link className="hover:text-amber-500 transition-colors font-medium" href="/about">
//                     About us
//                 </Link>
//             </nav>

//             {/* Desktop Search Bar */}
//             <div className="hidden md:block w-auto flex-1 max-w-md ml-8">
//                 <SearchBar 
//                     clicked={clicked} 
//                     setClicked={setClicked} 
//                     closeClicked={closeClicked}
//                     menuOpen={menuOpen}
//                     setMenuOpen={setMenuOpen}
//                 />
//             </div>

//             {/* Mobile Menu Button */}
//             <button 
//                 onClick={toggleMenu} 
//                 className="md:hidden text-2xl z-30 p-2 hover:text-amber-500 transition-colors rounded-md"
//                 aria-label="Toggle menu"
//             >
//                 {menuOpen ? <IoIosClose /> : <IoIosMenu />}
//             </button>

//             {/* Mobile Menu Overlay */}
//             <div className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'} z-10`}>
//                 <nav className="flex flex-col items-start justify-start w-full gap-6 p-4 pt-20">
//                     <Link 
//                         className="w-full text-lg py-3 hover:text-amber-500 transition-colors border-b border-gray-200 font-medium" 
//                         href="/categories" 
//                         onClick={toggleMenu}
//                     >
//                         Categories
//                     </Link>
//                     <Link 
//                         className="w-full text-lg py-3 hover:text-amber-500 transition-colors border-b border-gray-200 font-medium" 
//                         href="/about" 
//                         onClick={toggleMenu}
//                     >
//                         About us
//                     </Link>
//                     <div className="w-full mt-4">
//                         <SearchBar 
//                             clicked={clicked} 
//                             setClicked={setClicked} 
//                             closeClicked={closeClicked}
//                             menuOpen={menuOpen}
//                             setMenuOpen={setMenuOpen}
//                         />
//                     </div>
//                 </nav>
//             </div>
//         </header>
//     );
// };

// export default Header;




"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { IoIosMenu, IoIosClose } from "react-icons/io";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const closeClicked = () => {
        // Toggle the clicked state and ensure the mobile menu is closed when the search bar is opened
        setClicked(!clicked);
        if (!clicked) {
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => {
        // Toggle the mobile menu and close the search bar if it's open
        setMenuOpen(!menuOpen);
        if (clicked) {
            setClicked(false);
        }
    };

    return (
        <header className="select-none w-full p-4 gap-2 z-20 fixed top-0 backdrop-blur-lg bg-white/90 shadow-sm flex justify-between items-center text-black">
            {/* Logo Section */}
            <div className="w-3/12 max-md:w-5/12 flex-shrink-0 z-30">
                <h1 className="text-xl text-amber-500 font-bold w-full" onClick={() => { setClicked(false); setMenuOpen(false); }}>
                    <Link href="/" className="hover:text-amber-600 transition-colors">
                        Taste Treasures
                    </Link>
                </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex ${clicked ? "hidden" : "flex"} justify-center gap-8 w-auto items-center z-30`}>
                <Link className="hover:text-amber-500 transition-colors font-medium" href="/categories">
                    Categories
                </Link>
                <Link className="hover:text-amber-500 transition-colors font-medium" href="/about">
                    About us
                </Link>
            </nav>

            {/* Desktop Search Bar */}
            <div className={`hidden max-md:block w-auto flex-1 max-w-md ml-8 ${clicked ? "" : ""}`}>
                <SearchBar
                    clicked={clicked}
                    setClicked={setClicked}
                    closeClicked={closeClicked}
                />
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="max-md:block hidden text-2xl z-30 p-2 hover:text-amber-500 transition-colors rounded-md"
                aria-label="Toggle menu"
            >
                {menuOpen ? <IoIosClose /> : <IoIosMenu />}
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'} z-10`}>
                <nav className="flex flex-col items-start justify-start w-full gap-6 p-4 pt-20">
                    <Link
                        className="w-full text-lg py-3 hover:text-amber-500 transition-colors border-b border-gray-200 font-medium"
                        href="/categories"
                        onClick={toggleMenu}
                    >
                        Categories
                    </Link>
                    <Link
                        className="w-full text-lg py-3 hover:text-amber-500 transition-colors border-b border-gray-200 font-medium"
                        href="/about"
                        onClick={toggleMenu}
                    >
                        About us
                    </Link>
                    <div className="w-full mt-4">
                        <SearchBar
                            clicked={clicked}
                            setClicked={setClicked}
                            closeClicked={closeClicked}
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;