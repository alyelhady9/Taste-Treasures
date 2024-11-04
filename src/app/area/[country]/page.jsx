import Country from "../../components/Country";

const CountryPage = (props) => {
   

    return (
       <Country />
    );
}


export async function generateStaticParams() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();

    return data.meals.map(country => ({
        params: { country: country.strArea },
    }));
}


export default CountryPage;
