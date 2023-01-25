import React from "react";

function CloseButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="absolute top-0 right-0 p-2 rounded-full text-gray-600 hover:text-gray-800"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M6 18L18 6M6 6l12 12"
          fill="none"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}

export default CloseButton;
