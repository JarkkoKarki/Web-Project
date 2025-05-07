import React from 'react';

export const Modal = ({isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[#101211]">
      <div className="w-11/12 max-w-md space-y-1 rounded-lg border border-gray-400 bg-[#101211] p-6 sm:w-10/12 sm:max-w-lg md:w-8/12 md:max-w-xl lg:w-6/12 lg:max-w-2xl">
        <button
          className="absolute top-2 right-2 text-xl text-white"
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
