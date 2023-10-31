import React from "react";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50">
      <div
        className="modal-overlay absolute w-full h-full bg-gray-800 opacity-50"
        onClick={closeModal}
      ></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
