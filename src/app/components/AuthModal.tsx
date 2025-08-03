"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAuthModal } from '../features/authModalSlice'
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'
import { login, setUserName } from '../features/authSlice'
function AuthModal() {
    const [hasAccount, setHasAccount] = useState(true)
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [user , setUser] = useState ("")
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword)
    
    const dispatch = useDispatch()
    const handleAuthModal = () => {
        dispatch(toggleAuthModal())
    }

    const toggleHasAccount = () => setHasAccount(!hasAccount)

    const authModal = useSelector((state:any) => state.authModal.isOpen)
    
    const handleSubmit = (e:any) => { 
        e.preventDefault();
        dispatch(login())
        dispatch(setUserName(user))
        handleAuthModal()
    }

  return (
    <>
    {
        authModal &&
        <div onClick={handleAuthModal} className='flex justify-center items-center fixed z-50 w-full h-screen bg-black/70 backdrop-blur-sm inset-0'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white text-green-100 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 p-8 m-4 border border-green-800'>
                <div className="flex items-center justify-between border-b border-green-800 pb-4 mb-6">
            {
                hasAccount ? (
                <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Welcome Back!</h2>
                    <p className="text-sm text-gray-800 mt-1">Sign in to your account</p>
                </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Create Account</h2>
                        <p className="text-sm text-gray-800 mt-1">Join us and start cooking!</p>
                    </div>
                )
           }
          <button 
            onClick={handleAuthModal}
            className="p-2 hover:bg-orange-800 rounded-full transition-all duration-200"
          >
            <FaTimes className="text-orange-500 text-lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
            {
                !hasAccount &&
                <div className='mb-4'>
                <input
                type="text"
                placeholder="User Name"
                value={name}
                onChange={ (e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  focus:border-orange-500 transition-all duration-200 text-gray-900 bg-gray-50 placeholder-gray-400"
                />
                </div>
            }
            <div className="mb-4">
                <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  focus:border-orange-500 transition-all duration-200 text-gray-900 bg-gray-50 placeholder-gray-400"
                />
            </div>
            <div className="mb-4">
                <div className="relative">
                  <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none  focus:border-orange-500 transition-all duration-200 text-gray-900 bg-gray-50 placeholder-gray-400"
                  />
                  <button type="button" onClick={toggleShowPassword} className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-400 transition-colors">
                    {
                        showPassword ? (
                            <FaEyeSlash />
                        ): (
                            <FaEye />
                        )
                    }
                  </button>
                </div>
            </div>
            <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-500  border border-green-700 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-800">Remember me</span>
                </label>
                {
                    hasAccount &&
                        <button type="button" className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors">
                    Forgot password?
                    </button>
                }
            </div>
            <button type="submit" className="cursor-pointer w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
                {hasAccount ? "Sign In" : "Sign Up"}
            </button>
        </form>
        <div className="text-center mt-6">
            <p className="text-gray-800 text-sm">
                {
                    !hasAccount ? (
                        <span>Already have an account? </span>
                    ) : ( 
                        <span>Don't have an account? </span>
                   )
                }
                <button type="button" onClick={toggleHasAccount} className="cursor-pointer text-orange-400 hover:text-orange-300 font-semibold transition-colors ml-1">
                {
                    !hasAccount ? (
                        <span>Sign In</span>
                    ): (
                        <span>Sign Up</span>
                    )
                }
                </button>
            </p>
        </div>
            </div>
        </div>
    }
    </>
  )
}

export default AuthModal;
