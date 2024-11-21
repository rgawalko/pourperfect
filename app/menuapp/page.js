"use client";

import { useState } from "react";
import AddDrink from "./adddrink";
import FindDrink from "./finddrink";
import { jsPDF } from "jspdf";

export default function Page() {
  const [menu, setMenu] = useState([]);

  // Function to add a drink to the mock menu
  const handleAddDrink = (newDrink) => {
    setMenu((prevMenu) => [...prevMenu, { ...newDrink, price: 0 }]); // Default price set to 0
  };

  // Function to update the price of a drink
  const handleUpdatePrice = (index, newPrice) => {
    setMenu((prevMenu) =>
      prevMenu.map((drink, i) =>
        i === index ? { ...drink, price: parseFloat(newPrice) || 0 } : drink
      )
    );
  };

  // Function to generate and download the menu as a PDF
  const downloadMenuAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Mock Drink Menu", 10, 10);
    doc.setFontSize(12);

    if (menu.length === 0) {
      doc.text("No drinks available in the menu.", 10, 20);
    } else {
      let yPosition = 20; // Start position
      const spacing = 10; // Space between each drink's details

      menu.forEach((drink) => {
        doc.text(`Name: ${drink.name}`, 10, yPosition);
        yPosition += 5;
        doc.text(`Ingredients: ${drink.ingredients.join(", ")}`, 10, yPosition);
        yPosition += 5;
        doc.text(`Alcoholic: ${drink.alcoholic ? "Yes" : "No"}`, 10, yPosition);
        yPosition += 5;
        doc.text(`Category: ${drink.category}`, 10, yPosition);
        yPosition += 5;
        doc.text(`Glass: ${drink.glass}`, 10, yPosition);
        yPosition += 5;
        doc.text(`Price: $${drink.price.toFixed(2)}`, 10, yPosition);
        yPosition += spacing;
      });
    }

    doc.save("MockDrinkMenu.pdf");
  };

  return (
    <div className="min-h-screen bg-blue-900 p-6">
    <h1 className="text-3xl font-bold font-handwriting text-yellow-400 text-center mb-8">
      Mock Drink Menu Manager
    </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Add Custom Drink */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add Your Own Drink
          </h2>
          <AddDrink onAdd={handleAddDrink} />
        </div>

        {/* Right Column: Search for Drinks */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Search for Drinks
          </h2>
          <FindDrink onAdd={handleAddDrink} />
        </div>
      </div>

      {/* Display Mock Menu */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Mock Drink Menu
        </h2>
        {menu.length === 0 ? (
          <p className="text-gray-600 text-center">
            No drinks added to the menu yet. Start adding your custom drinks or
            search for drinks to add!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((drink, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                  {drink.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Ingredients:</strong> {drink.ingredients.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Category:</strong> {drink.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Glass:</strong> {drink.glass}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Alcoholic:</strong> {drink.alcoholic ? "Yes" : "No"}
                </p>
                <div className="flex items-center mt-4">
                  <label className="text-sm text-gray-600 mr-2">
                    <strong>Price:</strong>
                  </label>
                  <input
                    type="number"
                    value={drink.price || ""}
                    onChange={(e) => handleUpdatePrice(index, e.target.value)}
                    className="w-20 border border-gray-300 rounded-lg py-1 px-2 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Download as PDF Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={downloadMenuAsPDF}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Download Menu as PDF
        </button>
      </div>
    </div>
  );
}

