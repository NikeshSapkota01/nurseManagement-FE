import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { successToast } from "@/utils/toast";
import { updateNurse } from "@/reducers/nurse";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNurseSchema } from "@/rules/validation";

import FormElement from "./FormElement";
import { AddNurseValue } from "src/constants/interface";
import { CustomeModal } from "@/components/Layout/Modal";

const UpdateNurse: React.FC<{
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  nurseId: number;
  individualNurse: AddNurseValue | undefined;
}> = ({ editMode, setEditMode, nurseId, individualNurse }) => {
  const actionStatus = useSelector((state: RootState) => state?.nurse?.status);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddNurseValue>({
    defaultValues: {
      firstName: individualNurse?.firstName || "",
      middleName: individualNurse?.middleName || "",
      lastName: individualNurse?.lastName || "",
      email: individualNurse?.email || "",
      contact: individualNurse?.contact || "",
      working_days: individualNurse?.working_days || [],
      duty_start_time: individualNurse?.duty_start_time || "",
      duty_end_time: individualNurse?.duty_end_time || "",
      isRoundingManager: individualNurse?.isRoundingManager || false,
    },
    resolver: yupResolver(createNurseSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    reset();
    setIsOpen(false);
    setEditMode(false);
  }

  useEffect(() => {
    if (actionStatus === "updated") {
      closeModal();
      successToast({ title: "Nurse updated successfully!!" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionStatus]);

  const onSubmit = async (data: AddNurseValue) => {
    data.id = nurseId;
    dispatch(updateNurse(data));
  };

  return (
    <CustomeModal
      label="Update Nurse"
      contentLabel="Nurse Modal"
      closeModal={closeModal}
      openModal={openModal}
      modalIsOpen={modalIsOpen || editMode}
    >
      <div className="p-4">
        <FormElement
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          nurseId={nurseId}
          isEdit
        />
      </div>
    </CustomeModal>
  );
};

export default UpdateNurse;
