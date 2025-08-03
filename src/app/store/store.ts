import { configureStore } from "@reduxjs/toolkit";
import authReducer from  '../features/authSlice'
import authModalReducer from '../features/authModalSlice'
import wishListReducer from '../features/wishlistSlice'
import wishlistModalReducer from '../features/wishlistModalSlice'
 const store = configureStore ({
    reducer: {
        auth: authReducer,
        authModal: authModalReducer,
        wishlist: wishListReducer,
        wishlistModal: wishlistModalReducer,
    }
})


export default store;