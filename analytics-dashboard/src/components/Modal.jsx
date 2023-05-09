import React, { useState } from "react";
import { Transition } from "@headlessui/react";
// import { MdClose } from "react-icons/md";

function Modal({ isOpen, onClose, children }) {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-80 bg-gray-900">
        <div className="relative z-10 w-full flex flex-col 
        items-center justify-center max-w-2xl h-2/3 p-6 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg shadow-lg">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
            >
            </button>
          </div>
          {children}
        </div>
        <div className="fixed inset-0 z-0 bg-gray-800 opacity-25"></div>
      </div>
    </Transition>
  );
}

export default Modal;