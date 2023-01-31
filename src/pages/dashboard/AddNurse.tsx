import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { successToast } from "@/utils/toast";
import { addNurse, addImage } from "@/reducers/nurse";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNurseSchema } from "@/rules/validation";

import FormElement from "./FormElement";
import { AddNurseValue } from "src/constants/interface";
import { CustomeModal } from "@/components/Layout/Modal";

const AddNurse: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddNurseValue>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      contact: "",
      working_days: [],
      duty_start_time: "",
      duty_end_time: "",
      isRoundingManager: false,
    },
    resolver: yupResolver(createNurseSchema),
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const actionStatus = useSelector((state: RootState) => state?.nurse?.status);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    reset();
    setIsOpen(false);
  }

  useEffect(() => {
    if (actionStatus === "fullfilled") {
      closeModal();
      successToast({ title: "Nurse added successfully!!" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionStatus]);

  const onSubmit = async (data: AddNurseValue) => {
    const nurseImage = data.nurseImage;
    delete data.nurseImage;

    dispatch(addNurse(data)).then((data: any) => {
      if (data?.error) return;
      if (!nurseImage) {
        closeModal();
        return;
      }

      const { id } = data.payload.data[0];

      let formData = new FormData();
      formData.append("nurseImage", nurseImage);
      formData.append("nurseId", id);

      dispatch(addImage(formData));

      closeModal();
    });
  };

  return (
    <CustomeModal
      label="Add New Nurse"
      contentLabel="Nurse Modal"
      closeModal={closeModal}
      openModal={openModal}
      modalIsOpen={modalIsOpen}
    >
      <div className="p-4">
        <FormElement
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </div>
    </CustomeModal>
  );
};

export default AddNurse;
