import Image from "next/image";
import MainPage from "./components/MainPage";

export default function Home() {
  return (
    <div>
      {/* <div class="bg-emerald-500 text-white">Primary Button</div>
      <div class="bg-amber-400 text-white">Secondary Button</div>
      <div class="bg-gray-100">Main Background</div>
      <div class="text-gray-800">Primary Text</div>
      <div class="bg-red-500 text-white">Alert</div>
      <div class="bg-gray-100 min-h-screen p-4">
  <header class="bg-emerald-500 text-white p-4">
    <h1 class="text-2xl">Recipe Web App</h1>
  </header>
  <main class="mt-4">
    <div class="bg-white shadow-md p-4 mb-4">
      <h2 class="text-gray-800 text-xl">Delicious Recipe</h2>
      <p class="text-gray-600">This is a description of the recipe.</p>
      <button class="bg-amber-400 text-white py-2 px-4 mt-2">Get Recipe</button>
    </div>
    <div class="bg-red-500 text-white p-4">
      <p>Important Alert!</p>
    </div>
  </main>
</div> */}

  <MainPage />
    </div>
  );
}
