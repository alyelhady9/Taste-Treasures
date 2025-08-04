import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
    return (
        <div className="w-full min-h-screen py-16 bg-gradient-to-br from-orange-50 via-red-50 to-orange-50">
            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16">
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Placeholder image. You can replace this with a real brand image. */}
                    <Image
                        src="https://images.unsplash.com/photo-1706685835600-fa406f365c2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="A team cooking and enjoying food"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-8">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                            Our Culinary <span className="text-orange-400">Adventure</span>
                        </h1>
                        <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-2xl">
                            Bringing the world's most delightful recipes right to your kitchen.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full max-w-5xl mx-auto px-4 md:px-8">

                {/* Welcome Section */}
                <div className="my-12">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 mb-4">
                        Welcome to Taste Treasures!
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        At Taste Treasures, we believe that every meal is a journey, and every recipe is a treasure waiting to be discovered. Our mission is to bring the world’s most delightful and diverse culinary experiences right to your kitchen. Whether you’re a seasoned chef or a home cook, our platform is designed to inspire and empower you to create delicious meals with ease.
                    </p>
                </div>

                {/* Our Story Section */}
                <div className="my-12">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 mb-4">
                        Our Story
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Taste Treasures was born out of a passion for food and a desire to share the joy of cooking with others. Our founders, a group of food enthusiasts and tech innovators, came together with a vision to create a space where people could explore, share, and celebrate the art of cooking. From humble beginnings, we have grown into a vibrant community of food lovers from around the globe.
                    </p>
                </div>

                {/* What We Offer Section */}
                <div className="my-12">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 mb-4">
                        What We Offer
                    </h2>
                    <ul className="space-y-6 text-lg text-gray-700">
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">Extensive Recipe Collection:</strong> Discover thousands of recipes from various cuisines, each carefully curated and tested by our team of culinary experts. From quick weeknight dinners to elaborate holiday feasts, we have something for every occasion.
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">User-Friendly Search:</strong> Our intuitive search and filter options make it easy to find the perfect recipe. Search by ingredients, cuisine, dietary preferences, and more to tailor your cooking experience to your needs.
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">Step-by-Step Instructions:</strong> Each recipe comes with detailed, step-by-step instructions and photos to guide you through the cooking process. Whether you’re a beginner or an experienced cook, you’ll find our recipes easy to follow.
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">Community Engagement:</strong> Join our community of food enthusiasts! Share your own recipes, leave reviews, and connect with other members. Our forums and comment sections are great places to exchange tips, ask questions, and find inspiration.
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Our Values Section */}
                <div className="my-12">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 mb-4">
                        Our Values
                    </h2>
                    <ul className="space-y-6 text-lg text-gray-700">
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">Quality:</strong> We are committed to providing high-quality, reliable recipes that you can trust. Our team rigorously tests each recipe to ensure it meets our standards of excellence.
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">Diversity:</strong> We celebrate the rich diversity of global cuisines and strive to include recipes from all corners of the world.
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">Community:</strong> We believe that food brings people together. Our platform is built on the idea of sharing and connecting through the love of cooking.
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold text-2xl">•</span>
                            <div className="flex-1">
                                <strong className="font-semibold text-gray-800">Innovation:</strong> We are constantly evolving to bring you the best possible experience, dedicated to staying at the forefront of food and technology.
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Call to Action Section */}
                <div className="my-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                        Join Us on This Culinary Adventure
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                        We invite you to explore Taste Treasures and embark on a culinary adventure with us. Thank you for being a part of our community. Happy cooking!
                    </p>
                    <Link href="/categories">
                        <button className="cursor-pointer bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full mt-4 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Explore Recipes
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;