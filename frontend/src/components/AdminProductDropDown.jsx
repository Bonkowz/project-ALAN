import { useState } from 'react';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

function AdminProductDropDown({ selected, onSelect, sortOrder, onToggleOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: 'Name', value: 'productName' },
    { label: 'Type', value: 'productType' },
    { label: 'Price', value: 'productPrice' },
    { label: 'Qty', value: 'productQty' }
  ];

  const selectedLabel = options.find(opt => opt.value === selected)?.label || 'Sort';

  const handleSelect = (choice) => {
    onSelect(choice);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        {/* Sort Dropdown */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-gray-100 text-[#606C38]"
        >
          Sort results by: {selectedLabel}
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>

        {/* Order Toggle */}
        <button
          onClick={onToggleOrder}
          className="bg-white border border-gray-300 px-2 py-2 rounded-md shadow-sm hover:bg-gray-100 text-[#606C38]"
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
        >
          {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul>
            {options.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminProductDropDown;
