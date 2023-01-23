import React from "react";

import Modal from "@/components/Layout/Modal";

const AddNurse: React.FC = () => {
  return (
    <Modal
      label="Add New Nurse"
      title="Add Nurse"
      onConfirm={() => console.log("Button confirm")}
      onDiscard={() => console.log("Button discard")}
      buttons={[
        {
          role: "custom",
          onClick: () => console.log("custom test"),
          toClose: true,
          classes:
            "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
          label: "Custom",
        },
        {
          role: "discard",
          toClose: true,
          classes:
            "bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 m-10",
          label: "Discard",
        },
        {
          role: "confirm",
          toClose: false,
          classes:
            "bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200",
          label: "Confirm",
        },
      ]}
    >
      <div>AddNurse</div>
    </Modal>
  );
};

export default AddNurse;
