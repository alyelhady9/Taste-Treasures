
"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistModal } from '../features/wishlistModalSlice';
import { removeFromWishlist, WishlistItem } from '../features/wishlistSlice';
import Link from 'next/link';
import { X, Search } from 'lucide-react';

function WishlistModal() {
    const isOpen = useSelector((state: any) => state.wishlistModal.isOpen);
    const wishlistItems = useSelector((state: any) => state.wishlist.items);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [notes, setNotes] = useState<{ [key: string]: string }>({});

    // Load notes from localStorage on initial render
    useEffect(() => {
        try {
            const storedNotes = localStorage.getItem('wishlistNotes');
            if (storedNotes) {
                setNotes(JSON.parse(storedNotes));
            }
        } catch (e) {
            console.error("Failed to load wishlist notes from localStorage", e);
        }
    }, []);

    // Handle note changes and save to localStorage
    const handleNoteChange = (id: string, newNote: string) => {
        const updatedNotes = { ...notes, [id]: newNote };
        setNotes(updatedNotes);
        try {
            localStorage.setItem('wishlistNotes', JSON.stringify(updatedNotes));
        } catch (e) {
            console.error("Failed to save wishlist notes to localStorage", e);
        }
    };

    const handleClose = () => {
        dispatch(toggleWishlistModal());
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromWishlist(id));
        // Also remove the note from localStorage
        const updatedNotes = { ...notes };
        delete updatedNotes[id];
        setNotes(updatedNotes);
        try {
            localStorage.setItem('wishlistNotes', JSON.stringify(updatedNotes));
        } catch (e) {
            console.error("Failed to save wishlist notes to localStorage", e);
        }
    };

    // Filter items based on the search term
    const filteredItems = wishlistItems.filter((item:any) => {
        // Add a check to ensure item and its properties are not undefined
        if (!item || !item.strMeal) {
            return false;
        }
        
        const itemNote = notes[item.idMeal] || '';
        const searchLower = searchTerm.toLowerCase();
        return (
            item.strMeal.toLowerCase().includes(searchLower) ||
            itemNote.toLowerCase().includes(searchLower)
        );
    });

    if (!isOpen) {
        return null; // Don't render the modal if it's not open
    }

    return (
        <>
            {/* Modal Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300" 
                onClick={handleClose} 
            />

            {/* Main Modal Panel */}
            <div 
                className={`w-full md:w-8/12  fixed top-0 right-0 h-screen bg-white shadow-xl flex flex-col z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
                    <button 
                        onClick={handleClose} 
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                {/* Search Bar */}
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name or notes..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                {/* Wishlist Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item: any) => (
                            <div key={item.idMeal} className="bg-orange-50 rounded-lg p-4 flex flex-col space-y-4 shadow-md border border-orange-100">
                                {/* Item Details */}
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.strMealThumb} 
                                        alt={item.strMeal} 
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <Link href={`/recipe/${item.idMeal}`} onClick={handleClose}>
                                            <h3 className="text-lg font-semibold text-gray-800 hover:text-orange-600 transition-colors">
                                                {item.strMeal}
                                            </h3>
                                        </Link>
                                    </div>
                                    <button 
                                        onClick={() => handleRemove(item.idMeal)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                {/* Notes Section */}
                                <div>
                                    <label htmlFor={`notes-${item.idMeal}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Notes
                                    </label>
                                    <textarea
                                        id={`notes-${item.idMeal}`}
                                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        rows={2}
                                        value={notes[item.idMeal] || ''}
                                        onChange={(e) => handleNoteChange(item.idMeal, e.target.value)}
                                        placeholder="Add a note about this recipe..."
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 italic">No items found in your wishlist.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default WishlistModal;