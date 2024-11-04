import Link from "next/link";

const FeaturedRecipe = ({idMeal,strMeal,strMealThumb,}) => {
    return (
        <Link href={`/recipe/${idMeal}`} className="">

            <div className="bg-white max-md:w-[12rem] hover:bg-gray-100 h-full pb-4 border p-4 rounded-lg shadow-lg mb-8 flex flex-col items-center justify-between " key={idMeal}>
                <img className=' rounded-b-none rounded-t-md ' src={strMealThumb} alt={strMeal} />
                <h2 className="px-4 text-center text-lg font-bold my-2">{strMeal}</h2>
            </div>
        </Link>
      );
}
 
export default FeaturedRecipe;