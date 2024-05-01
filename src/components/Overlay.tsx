import React, { FC } from "react";
import closeIcon from "../assets/icons/xmark.svg";

interface OverlayProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Overlay: FC<OverlayProps> = ({ children, isOpen = false, onClose }) => {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900/50 flex items-center justify-center z-50">
        <div className="relative bg-base-200 rounded-lg p-4 shadow-md">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-0 right-0 m-1.5 focus:outline-none"
          >
            <img className="w-6" src={closeIcon} alt="Close icon" />
          </button>

          {children}
        </div>
      </div>
    )
  );
};

export default Overlay;
