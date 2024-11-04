import Link from "next/link";

const Footer = () => {
    return ( <footer className="w-full border-t-2 mt-16 border-gray-200 p-4 text-center select-none">
        <p className="text-lg ">
            Taste Treasures &copy; {new Date().getFullYear()} all rights reserved.
        </p>
        
    </footer> );
}
 
export default Footer;