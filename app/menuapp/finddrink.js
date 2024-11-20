import { useState } from "react";

export default function FindDrink({ onAdd }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // "name" or "ingredient"
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Popular liquor options
  const liquors = ["Gin", "Vodka", "Tequila", "Rum", "Whiskey"];

  const searchDrinks = async () => {
    setIsLoading(true);
    setError("");
    setDrinks([]);

    try {
      let apiUrl = "";

      if (searchType === "name") {
        if (!searchTerm.trim()) {
          setError("Please enter a search term.");
          setIsLoading(false);
          return;
        }
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
      } else if (searchType === "ingredient") {
        if (!selectedIngredient) {
          setError("Please select an ingredient.");
          setIsLoading(false);
          return;
        }
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.drinks) {
        setDrinks(data.drinks);
      } else {
        setError("No drinks found.");
      }
    } catch (err) {
      setError("An error occurred while fetching drinks.");
    } finally {
      setIsLoading(false);
    }
  };

  const addDrinkToMenu = async (drink) => {
    try {
      // Fetch full details of the drink using its ID
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
      );
      const data = await response.json();
  
      if (data.drinks && data.drinks.length > 0) {
        const fullDrink = data.drinks[0];
  
        // Create a new drink object with full details
        const newDrink = {
          name: fullDrink.strDrink,
          ingredients: Object.keys(fullDrink)
            .filter((key) => key.startsWith("strIngredient") && fullDrink[key])
            .map((key) => fullDrink[key]),
          alcoholic: fullDrink.strAlcoholic === "Alcoholic",
          category: fullDrink.strCategory || "Unknown",
          glass: fullDrink.strGlass || "Unknown",
        };
  
        onAdd(newDrink);
      } else {
        console.error("Failed to fetch full drink details.");
      }
    } catch (error) {
      console.error("Error fetching drink details:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Drinks</h1>

      {/* Search Type Selection */}
      <div className="w-full max-w-md mb-4">
        <label className="block text-gray-700 font-bold mb-2">Search By:</label>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        >
          <option value="name">Drink Name</option>
          <option value="ingredient">Ingredient</option>
        </select>
      </div>

      {/* Conditional Inputs Based on Search Type */}
      {searchType === "name" ? (
        <div className="w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="Enter drink name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3"
          />
        </div>
      ) : (
        <div className="w-full max-w-md mb-4">
          <label className="block text-gray-700 font-bold mb-2">Select Ingredient:</label>
          <select
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3"
          >
            <option value="">-- Select Liquor --</option>
            {liquors.map((liquor) => (
              <option key={liquor} value={liquor}>
                {liquor}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={searchDrinks}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full transition duration-300"
      >
        Search
      </button>

      {/* Loading/Error Messages */}
      {isLoading && <p className="text-gray-600 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mt-6">
        {drinks.map((drink) => (
          <div
            key={drink.idDrink}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {drink.strDrink}
            </h2>
            {drink.strDrinkThumb && (
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                className="rounded-lg mb-4"
              />
            )}
            <button
              onClick={() => addDrinkToMenu(drink)}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 w-full"
            >
              Add to Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
