// import Link from "next/link";

// const FeaturedRecipe = ({idMeal,strMeal,strMealThumb,}) => {
//     return (
//         <Link href={`/recipe/${idMeal}`} className="">

//             <div className="bg-white max-md:w-[12rem] hover:bg-gray-100 h-full pb-4 border p-4 rounded-lg shadow-lg mb-8 flex flex-col items-center justify-between " key={idMeal}>
//                 <img className=' rounded-b-none rounded-t-md ' src={strMealThumb} alt={strMeal} />
//                 <h2 className="px-4 text-center text-lg font-bold my-2">{strMeal}</h2>
//             </div>
//         </Link>
//       );
// }
 
// export default FeaturedRecipe;

import Link from "next/link";
import Image from "next/image";

// Define the interface for the component's props
interface FeaturedRecipeProps {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const FeaturedRecipe = ({ idMeal, strMeal, strMealThumb }: FeaturedRecipeProps) => {
    return (
        <Link href={`/recipe/${idMeal}`} className="block">
            <div className="bg-white max-md:w-[12rem] hover:bg-gray-100 h-full pb-4 border p-4 rounded-lg shadow-lg mb-8 flex flex-col items-center justify-between">
                <Image
                    src={strMealThumb}
                    alt={strMeal}
                    width={500} // You may need to adjust these values
                    height={300} // You may need to adjust these values
                    className="rounded-b-none rounded-t-md"
                />
                <h2 className="px-4 text-center text-lg font-bold my-2">{strMeal}</h2>
            </div>
        </Link>
    );
}

export default FeaturedRecipe;
