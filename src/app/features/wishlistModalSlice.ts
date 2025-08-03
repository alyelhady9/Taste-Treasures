import { createSlice } from "@reduxjs/toolkit";


const wishlistModalSlice = createSlice({
    name: "wishlistModal",
    initialState: {
        isOpen: false,
    },
    reducers : {
        toggleWishlistModal: (state :any) => {state.isOpen =!state.isOpen}
    }
 })



export default wishlistModalSlice.reducer;
export const {toggleWishlistModal} = wishlistModalSlice.actions;