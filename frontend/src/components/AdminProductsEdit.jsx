function AdminProductsEdit({ product, updatedQty, updatedPrice, onQtyChange, onPriceChange, onCancel, onSave }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-[#606C38]">Edit Product</h2>
        <label className="block mb-2">
          Quantity:
          <input
            type="number"
            className="w-full border p-2 mt-1"
            value={updatedQty}
            onChange={(e) => onQtyChange(Number(e.target.value))}
          />
        </label>
        <label className="block mb-4">
          Price:
          <input
            type="number"
            className="w-full border p-2 mt-1"
            value={updatedPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
          />
        </label>
        <div className="flex justify-between">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[#BC6C25] text-white px-4 py-2 rounded"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductsEdit;
