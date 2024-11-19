"use client";

import { useState } from "react";

export default function FindDrink({ onAdd }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchByName = async () => {
    if (!searchTerm) {
      setError("Please enter a search term.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      if (data.drinks) {
        setDrinks(data.drinks);
      } else {
        setDrinks([]);
        setError("No drinks found.");
      }
    } catch (err) {
      setError("An error occurred while fetching drinks.");
    } finally {
      setIsLoading(false);
    }
  };

  const addDrinkToMenu = (drink) => {
    const newDrink = {
      name: drink.strDrink,
      ingredients: Object.keys(drink)
        .filter((key) => key.startsWith("strIngredient") && drink[key])
        .map((key) => drink[key]),
      alcoholic: drink.strAlcoholic === "Alcoholic",
      category: drink.strCategory,
      glass: drink.strGlass,
    };

    onAdd(newDrink);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Drinks</h1>

      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search for a drink by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4"
        />
        <button
          onClick={searchByName}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full transition duration-300"
        >
          Search
        </button>
      </div>

      {isLoading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {drinks.map((drink) => (
          <div
            key={drink.idDrink}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
              {drink.strDrink}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Category:</strong> {drink.strCategory}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Glass:</strong> {drink.strGlass}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Alcoholic:</strong> {drink.strAlcoholic}
            </p>
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="rounded-lg mb-4"
            />
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
