import React from 'react';

const MenuInput = ({ name, value, onChange, placeholder, type = 'text' }) => {
  return (
    <input
    name={name}
    type={type}
    id={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full rounded border border-[#2a2c2b] bg-[#101211] px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
  />
  );
};

export default MenuInput;
