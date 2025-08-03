// src/redux/features/wishlistSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --------------------------------------------------
// 1. Define the TypeScript types for your state
// --------------------------------------------------

// Type for a single item in the wishlist
export interface WishlistItem {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

// Type for the entire wishlist state
export interface WishlistState {
    items: WishlistItem[];
}

// --------------------------------------------------
// 2. Helper functions for local storage
// --------------------------------------------------

// Function to save the state to localStorage
const saveToLocalStorage = (state: WishlistState) => {
    try {
        localStorage.setItem('wishlist', JSON.stringify(state.items));
    } catch (e) {
        console.error("Failed to save wishlist to localStorage", e);
    }
};

// Function to load the initial state from localStorage
const loadFromLocalStorage = (): WishlistState => {
    try {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            return { items: JSON.parse(storedWishlist) };
        }
    } catch (e) {
        console.error("Failed to load wishlist from localStorage", e);
    }
    return { items: [] };
};

const initialState: WishlistState = loadFromLocalStorage();

// --------------------------------------------------
// 3. Create the Redux Toolkit slice with local storage logic
// --------------------------------------------------

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
            const newItem = action.payload;
            // Prevent adding duplicate items
            const isItemInWishlist = state.items.some(item => item.idMeal === newItem.idMeal);
            if (!isItemInWishlist) {
                state.items.push(newItem);
                // Save the new state to localStorage
                saveToLocalStorage(state);
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item.idMeal !== idToRemove);
            // Save the new state to localStorage
            saveToLocalStorage(state);
        },
        clearWishlist: (state) => {
            state.items = [];
            // Save the new state to localStorage
            saveToLocalStorage(state);
        },
    },
});

// --------------------------------------------------
// 4. Export the actions and the reducer
// --------------------------------------------------

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;