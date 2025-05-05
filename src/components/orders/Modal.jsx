import React from 'react';

export const Modal = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[#101211]">
      <div className="w-96 space-y-1 rounded-lg border-t border-gray-700 bg-[#101211] p-6">
        <button
          className="absolute top-2 right-2 text-xl text-black"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
