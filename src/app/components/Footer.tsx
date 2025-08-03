// import Link from "next/link";

// const Footer = () => {
//     return ( <footer className="w-full border-t-2 mt-16 border-gray-200 p-4 text-center select-none">
//         <p className="text-lg ">
//             Taste Treasures &copy; {new Date().getFullYear()} all rights reserved.
//         </p>
        
//     </footer> );
// }
 
// export default Footer;


import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 mt-2 py-12 lg:py-16 text-gray-700 select-none border-t-2 border-orange-100 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link href="/" className="group">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:via-red-700 group-hover:to-orange-800 transition-all duration-300">
                                Taste Treasures
                            </h2>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">
                            Your daily dose of delicious recipes from around the world.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-orange-600 transition-colors duration-300">
                                <FaFacebook className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-orange-600 transition-colors duration-300">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="https://x.com" aria-label="Twitter" className="text-gray-500 hover:text-orange-600 transition-colors duration-300">
                                <FaTwitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/categories" className="text-gray-600 hover:text-orange-600 transition-colors duration-300">
                                    Recipe Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors duration-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors duration-300">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors duration-300">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter or Contact */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay in the loop</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Subscribe to our newsletter for weekly recipe inspiration.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-orange-200 text-center text-sm text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Taste Treasures. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
 
export default Footer;