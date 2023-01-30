import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNurse } from "@/reducers/nurse";
import { successToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNurseSchema } from "@/rules/validation";

import SelectField from "@/components/common/Select";
import InputField from "@/components/common/InputField";
import { AddNurseValue } from "src/constants/interface";
import { CustomeModal } from "@/components/Layout/Modal";
import { WorkingDaysOption } from "src/constants/constant";

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
    dispatch(addNurse(data));
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="First Name:"
            type="text"
            id="firstName"
            placeholder="First Name"
            register={register}
            name={"firstName"}
            errorMessage={errors?.firstName}
            required
          />

          <InputField
            label="Middle Name:"
            type="text"
            id="middleName"
            placeholder="Middle Name"
            register={register}
            name="middleName"
            errorMessage={errors?.middleName}
          />

          <InputField
            label="Last Name:"
            type="text"
            id="lastName"
            placeholder="Last Name"
            register={register}
            name="lastName"
            errorMessage={errors?.lastName}
            required
          />

          <InputField
            label="Email:"
            type="text"
            id="email"
            placeholder="nikesh@gmail.com"
            register={register}
            name="email"
            errorMessage={errors?.email}
            required
          />

          <InputField
            label="Contact:"
            type="text"
            id="contact"
            placeholder="9898989898"
            register={register}
            name="contact"
            errorMessage={errors?.contact}
            required
          />

          <InputField
            label="Duty start time:"
            type="time"
            id="duty_start_time"
            placeholder="Duty start time"
            register={register}
            name="duty_start_time"
            errorMessage={errors?.duty_start_time}
          />

          <InputField
            label="Duty end time:"
            type="time"
            id="duty_end_time"
            placeholder="Duty end time"
            register={register}
            name="duty_end_time"
            errorMessage={errors?.duty_end_time}
          />

          <SelectField
            name="working_days"
            control={control}
            label="Working days"
            errorMessage={errors?.working_days}
            option={WorkingDaysOption}
            setValue={setValue}
          />

          <div className="mb-4">
            <div className="flex">
              <input
                type="checkbox"
                id="selectCheckbox"
                className="text-grey-300 w-4 h-4 rounded"
                {...register("isRoundingManager")}
              />
              <label htmlFor="isRoundingManager" className="form-check-label">
                <div className={`text-sm text-grey-500 ml-2`}>
                  <span>Is Rounding manager </span>
                </div>
              </label>
            </div>
            {errors.isRoundingManager && (
              <p className="text-red-600 text-sm mt-1 ">
                {errors.isRoundingManager.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-block mb-9 mt-5 h-10 bg-blue-500 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full disabled:bg-blue-200"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Create Nurse
          </button>
        </form>
      </div>
    </CustomeModal>
  );
};

export default AddNurse;
