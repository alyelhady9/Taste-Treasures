// import { createSlice } from "@reduxjs/toolkit";

// const saveToLocalStorage = (state: any) => {
//     try {
//       localStorage.setItem('auth', JSON.stringify({
//         isAuthenticated: state.isAuthenticated,
//         user: state.user
//       }));
//     } catch (error) {
//       console.error('Failed to save to localStorage:', error);
//     }
//   };
  
//   const loadFromLocalStorage = () => {
//     try {
//       const saved = localStorage.getItem('auth');
//       return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null };
//     } catch (error) {
//       console.error('Failed to load from localStorage:', error);
//       return { isAuthenticated: false, user: null };
//     }
//   };
  

// const authSlice = createSlice( {
//     name: "auth",
//     initialState: {
//         isAuthenticated: false,
//         user: null,
//         isHydrated: false,

//     },
//     reducers: {
//         hydrateAuth: (state) => {
//             const saved = loadFromLocalStorage();
//             state.isAuthenticated = saved.isAuthenticated;
//             state.user = saved.user;
//             state.isHydrated = true;
//           },
//         login: (state) => {
//             state.isAuthenticated = true;
//             saveToLocalStorage(state);
//         },
//         logout: (state) => {
//             state.isAuthenticated = false;
//             state.user = null;
//             saveToLocalStorage(state);
//         },

//         setUserName: (state, action) => { 
//             state.user = action.payload
//             saveToLocalStorage(state);
//         }

//     }
// })
// export const { login, setUserName } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppListener, AppStartListening } from '../../app/store';

// Helper functions for local storage
const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    }));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('auth');
    if (saved === null) {
      return { isAuthenticated: false, user: null };
    }
    return JSON.parse(saved);
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return { isAuthenticated: false, user: null };
  }
};

// Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...loadFromLocalStorage(), // Load initial state from local storage
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
  }
});

export const { login, logout, setUserName } = authSlice.actions;
export default authSlice.reducer;

// Listener for Redux Toolkit to handle local storage saving
export const startAuthListener: AppStartListening = (startListening) => {
  startListening({
    actionCreator: login,
    effect: (action, listenerApi) => {
      saveToLocalStorage(listenerApi.getState().auth);
    }
  });

  startListening({
    actionCreator: logout,
    effect: (action, listenerApi) => {
      saveToLocalStorage(listenerApi.getState().auth);
    }
  });

  startListening({
    actionCreator: setUserName,
    effect: (action, listenerApi) => {
      saveToLocalStorage(listenerApi.getState().auth);
    }
  });
};