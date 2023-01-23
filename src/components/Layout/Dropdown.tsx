import React, { useState } from "react";

interface DropDownInterface {
  options: { label: string; value: string }[];
  onItemClick: (value: string) => void;
}

const DropDown = ({ options, onItemClick }: DropDownInterface) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="relative">
      <div>
        <span>
          <button onClick={() => setOpen(!isOpen)}>---</button>
        </span>
      </div>
      {isOpen ? (
        <div className="absolute right-0 z-10 bg-white rounded-lg shadow-xl py-2 ">
          {options.map((item, index) => {
            return (
              <button
                className="block px-4 py-2 text-grey-800 hover:bg-grey-300 w-32"
                key={index}
                onClick={() => {
                  onItemClick(item.value);
                  setOpen(!isOpen);
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
