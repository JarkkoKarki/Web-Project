import React from 'react';

const MenuCheckbox = ({ title, name, options, selectedValues, onChange }) => {
  return (
    <div className="mb-6 border-b border-gray-600 pb-4">
      <h3 className="text-lg font-semibold text-yellow-400 mb-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option.id} className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              name={name}
              value={option.id}
              checked={selectedValues.includes(option.id)}
              onChange={(e) => onChange(e, name)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MenuCheckbox;
