export default function Drink({ name, ingredients, alcoholic, category, glass, onSelect }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">{name}</h1>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Ingredients:</strong> {ingredients.join(", ")}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Alcoholic:</strong> {alcoholic ? "Yes" : "No"}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Glass:</strong> {glass}
          </p>
          <button
            onClick={onSelect}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
          >
            Select
          </button>
        </div>
      </div>
    );
  }
  