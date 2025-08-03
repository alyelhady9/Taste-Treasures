import Image from "next/image";
import bg from "../../images/background.jpeg"
import bgf from "../../images/backgroundPhone.jpeg"
import TrendingRecpies from "./TrendingRecipes";
import CategoriesSection from "./CategoriesSection";
import Link from "next/link";
const MainPage = () => {
    return ( 
        <div className=" flex flex-col select-none text-gray-700"> 
          <div className="">

              <div className="w-full relative">

                <div className="">
                    <img className="w-full h-full max-md:hidden" src={bg} alt="Logo"  />
                    <img className="w-full  hidden max-md:block" src={bgf} alt="Logo"  />
                    <div className="absolute top-1/4 w-full  mt-8  flex flex-col justify-center items-center px-10 ">
                        <p className="text-3xl max-md:text-xl font-bold mb-2 text-amber-500 ">
                          Find, Cook, Enjoy!
                        </p>
                        <p className="text-xl text-center max-md:text-[14px] font-bold max-md:w-5/6 w-1/2">Unlock the Secrets of Culinary Excellence: Explore Thousands of Recipes, Master New Techniques, and Delight Your Taste Buds with Every Meal. </p>
                      <Link href="/categories"><button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-md mt-4 ">More Recipes</button></Link>
                        
                    </div>     
                </div>
              </div>
          </div>
            <TrendingRecpies />
            <CategoriesSection />
        </div>
     );
}
 
export default MainPage;
