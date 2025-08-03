// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from  '../features/authSlice'
// import authModalReducer from '../features/authModalSlice'
// import wishListReducer from '../features/wishlistSlice'
// import wishlistModalReducer from '../features/wishlistModalSlice'
//  const store = configureStore ({
//     reducer: {
//         auth: authReducer,
//         authModal: authModalReducer,
//         wishlist: wishListReducer,
//         wishlistModal: wishlistModalReducer,
//     }
// })


// export default store;



// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import authModalReducer from '../features/authModalSlice';
import wishListReducer from '../features/wishlistSlice';
import wishlistModalReducer from '../features/wishlistModalSlice';
import { listenerMiddleware } from '../features/middleware'; // Import the middleware

const store = configureStore({
    reducer: {
        auth: authReducer,
        authModal: authModalReducer,
        wishlist: wishListReducer,
        wishlistModal: wishlistModalReducer,
    },
    // Add the listener middleware to the store
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;