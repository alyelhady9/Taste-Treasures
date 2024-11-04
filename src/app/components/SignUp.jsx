"use client"
import { useState } from "react";
const SignUp = () => {
    const [username, setUsername] = useState("")
    return ( 
        <form className="w-4/12 max-md:w-8/12 mx-auto flex flex-col gap-4">
            <input placeholder="email" className="border-gray-300 w-full rounded-md px-4 py-2 focus:border-green-500 border-2 focus:outline-none " type="email"  />
            <input placeholder="username" className="border-gray-300 w-full rounded-md px-4 py-2 focus:border-green-500 border-2 focus:outline-none " type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
            <input placeholder="password" className="border-gray-300 w-full rounded-md px-4 py-2 focus:border-green-500 border-2 focus:outline-none " type="password" />
           
            



        </form>
     );
}
 
export default SignUp;