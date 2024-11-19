import { useState } from "react";

export default function AddDrink({ onAdd }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [alcoholic, setAlcoholic] = useState(false);
  const [category, setCategory] = useState("");
  const [glass, setGlass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !ingredients || !category || !glass) {
      alert("Please fill in all the fields!");
      return;
    }

    // Call the onAdd callback with the new drink details
    onAdd({
      name,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      alcoholic,
      category,
      glass,
    });

    // Clear the form after submission
    setName("");
    setIngredients("");
    setAlcoholic(false);
    setCategory("");
    setGlass("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add a New Drink
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3"
            placeholder="Enter drink name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ingredients (comma-separated):
          </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3"
            placeholder="e.g., Vodka, Orange Juice, Ice"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Alcoholic:
          </label>
          <input
            type="checkbox"
            checked={alcoholic}
            onChange={(e) => setAlcoholic(e.target.checked)}
            className="mr-2"
          />
          <span>{alcoholic ? "Yes" : "No"}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3"
            placeholder="e.g., Cocktail"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Glass:
          </label>
          <input
            type="text"
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3"
            placeholder="e.g., Highball glass"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full transition duration-300"
        >
          Add Drink
        </button>
      </form>
    </div>
  );
}
