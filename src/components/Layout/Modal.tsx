import React from "react";
import Modal from "react-modal";
import CloseButton from "@/components/Layout/CloseButton";
import { UseFormReset } from "react-hook-form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    overflow: "scroll",
    maxHeight: "90vh",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

interface modalTypes {
  label: string;
  children: React.ReactNode;
  contentLabel: string;
  reset: () => void;
}

export const CustomeModal = ({
  label,
  children,
  contentLabel,
  reset,
}: modalTypes) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    reset();
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
        <CloseButton onClick={closeModal} />
        {children}
      </Modal>
    </div>
  );
};
