
export default function MockMenu({ menu, handleUpdatePrice, downloadMenuAsPDF }) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
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
