import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface modalTypes {
  label: string;
  children: React.ReactNode;
  buttons: any;
  onDiscard: () => void;
  onConfirm: () => void;
  contentLabel: string;
}

export const CustomeModal = ({
  label,
  children,
  contentLabel,
  buttons = [],
  onDiscard,
  onConfirm,
}: modalTypes) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        className="inline-block mb-9 p-2 mt-5 h-10 bg-blue-500 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-blue-200"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        onClick={openModal}
      >
        {label}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={contentLabel}
      >
        {children}

        <div className="flex items-center justify-end mr-4 ml-4 rounded-b">
          {buttons.map((button: any, index: number) => (
            <button
              onClick={() => {
                if (button.role === "discard") {
                  onDiscard();
                }
                if (button.role === "confirm") {
                  onConfirm();
                }

                if (button.role === "custom") {
                  button.onClick();
                }

                if (button.toClose) {
                  closeModal();
                }
              }}
              key={index}
              className={button.classes}
            >
              {button.label}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
