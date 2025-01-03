"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";

const Footer = () => {
      const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);
    
    return ( <footer className="w-full border-t-2 mt-16 border-gray-200 p-4 text-center select-none">
        <p className="text-lg ">
            Taste Treasures &copy; {year} all rights reserved.
        </p>
        
    </footer> );
}
 
export default Footer;
