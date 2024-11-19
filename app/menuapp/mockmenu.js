import { useState } from "react";
import AddDrink from "./adddrink";

export default function MockMenu() {
  const [menu, setMenu] = useState([]);

  // Function to handle adding a drink to the menu
  const handleAddDrink = (newDrink) => {
    setMenu((prevMenu) => [...prevMenu, newDrink]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* AddDrink component for adding drinks */}
      <AddDrink onAdd={handleAddDrink} />

      {/* Display mock menu */}
      <div className="mt-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Mock Drink Menu
        </h1>
        {menu.length === 0 ? (
          <p className="text-gray-600 text-center">
            No drinks added to the menu yet. Start adding drinks!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((drink, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
                  {drink.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Ingredients:</strong>{" "}
                  {drink.ingredients.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Alcoholic:</strong> {drink.alcoholic ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Category:</strong> {drink.category}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Glass:</strong> {drink.glass}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
