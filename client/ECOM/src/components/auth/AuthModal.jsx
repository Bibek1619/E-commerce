import React from "react";

const AuthModal = ({ open, onClose, children, title }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-[3px] bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-[#ffff] rounded-2xl shadow-2xl w-full max-w-md p-6 relative "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">{title}</h2>

        {/* Children (Login / SignUp forms) */}
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default AuthModal;
