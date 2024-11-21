"use client";

import { useState } from "react";
import AddDrink from "./adddrink";
import FindDrink from "./finddrink";
import MockMenu from "./mockmenu";
import { jsPDF } from "jspdf";

export default function Page() {
  const [menu, setMenu] = useState([]);

  // Function to handle adding a drink to the menu
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
  
    // Page settings
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20; // Left and right margins
    const contentWidth = pageWidth - margin * 2; // Content width
  
    // Add a title to the PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(44, 62, 80); // Dark gray-blue
    doc.text("Mock Drink Menu", pageWidth / 2, 20, null, null, "center");
  
    // Add a horizontal line under the title
    doc.setDrawColor(44, 62, 80);
    doc.setLineWidth(0.5);
    doc.line(margin, 25, pageWidth - margin, 25);
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80);
  
    if (menu.length === 0) {
      // No drinks message
      doc.text("No drinks available in the menu.", margin, 40);
    } else {
      let yPosition = 35; // Start position for the first drink
      const spacing = 10; // Space between each drink's details
  
      menu.forEach((drink, index) => {
        if (yPosition > 270) {
          // Add a new page if the content exceeds the page height
          doc.addPage();
          yPosition = 20;
        }
  
        // Add drink number as a header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(26, 188, 156); // Teal
        doc.text(`Drink ${index + 1}: ${drink.name}`, margin, yPosition);
        yPosition += 8;
  
        // Add drink details with text wrapping
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80); // Dark gray-blue
  
        const wrappedIngredients = doc.splitTextToSize(
          `Ingredients: ${drink.ingredients.join(", ")}`,
          contentWidth
        );
        doc.text(wrappedIngredients, margin, yPosition);
        yPosition += wrappedIngredients.length * 6; // Adjust Y position based on wrapped lines
  
        doc.text(`Alcoholic: ${drink.alcoholic ? "Yes" : "No"}`, margin, yPosition);
        yPosition += 6;
  
        doc.text(`Category: ${drink.category}`, margin, yPosition);
        yPosition += 6;
  
        doc.text(`Glass: ${drink.glass}`, margin, yPosition);
        yPosition += 6;
  
        doc.text(`Price: $${drink.price.toFixed(2)}`, margin, yPosition);
        yPosition += spacing;
  
        // Add a separator line between drinks
        doc.setDrawColor(192, 192, 192); // Light gray
        doc.setLineWidth(0.3);
        doc.line(margin, yPosition - 6, pageWidth - margin, yPosition - 6);
      });
    }
  
    // Save the PDF
    doc.save("MockDrinkMenu.pdf");
  };
  
  

  return (
    <div className="min-h-screen bg-blue-900 p-6">
      <h1 className="text-5xl font-bold font-handwriting text-yellow-400 text-center mb-8">
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

      {/* Mock Menu */}
      <MockMenu
        menu={menu}
        handleUpdatePrice={handleUpdatePrice}
        downloadMenuAsPDF={downloadMenuAsPDF}
      />
    </div>
  );
}
