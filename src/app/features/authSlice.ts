
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppListener, AppStartListening } from '../../app/store';

// // Helper functions for local storage
// const saveToLocalStorage = (state: any) => {
//   try {
//     localStorage.setItem('auth', JSON.stringify({
//       isAuthenticated: state.isAuthenticated,
//       user: state.user,
//     }));
//   } catch (error) {
//     console.error('Failed to save to localStorage:', error);
//   }
// };

// const loadFromLocalStorage = () => {
//   try {
//     const saved = localStorage.getItem('auth');
//     if (saved === null) {
//       return { isAuthenticated: false, user: null };
//     }
//     return JSON.parse(saved);
//   } catch (error) {
//     console.error('Failed to load from localStorage:', error);
//     return { isAuthenticated: false, user: null };
//   }
// };

// // Redux Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     ...loadFromLocalStorage(), // Load initial state from local storage
//   },
//   reducers: {
//     login(state) {
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//     setUserName(state, action: PayloadAction<string>) {
//       state.user = action.payload;
//     },
//   }
// });

// export const { login, logout, setUserName } = authSlice.actions;
// export default authSlice.reducer;

// // Listener for Redux Toolkit to handle local storage saving
// export const startAuthListener: AppStartListening = (startListening) => {
//   startListening({
//     actionCreator: login,
//     effect: (action, listenerApi) => {
//       saveToLocalStorage(listenerApi.getState().auth);
//     }
//   });

//   startListening({
//     actionCreator: logout,
//     effect: (action, listenerApi) => {
//       saveToLocalStorage(listenerApi.getState().auth);
//     }
//   });

//   startListening({
//     actionCreator: setUserName,
//     effect: (action, listenerApi) => {
//       saveToLocalStorage(listenerApi.getState().auth);
//     }
//   });
// };


// src/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStartListening ,listenerMiddleware} from './middleware';
import { RootState } from '../store/store';

// Define the type for our auth state
interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

// Helper functions for local storage
const saveToLocalStorage = (state: AuthState) => {
  try {
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    }));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const loadFromLocalStorage = (): AuthState => {
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
  initialState: loadFromLocalStorage(),
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
  },
});

export const { login, logout, setUserName } = authSlice.actions;
export default authSlice.reducer;

// Listener for Redux Toolkit to handle local storage saving
export const startAuthListener = listenerMiddleware.startListening as AppStartListening;

// This listener is not needed anymore
startAuthListener({
  actionCreator: login,
  effect: (action, listenerApi) => {
    saveToLocalStorage(listenerApi.getState().auth);
  }
});

startAuthListener({
  actionCreator: logout,
  effect: (action, listenerApi) => {
    saveToLocalStorage(listenerApi.getState().auth);
  }
});

startAuthListener({
  actionCreator: setUserName,
  effect: (action, listenerApi) => {
    saveToLocalStorage(listenerApi.getState().auth);
  }
});