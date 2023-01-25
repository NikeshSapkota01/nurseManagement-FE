import React from "react";

import { CustomeModal } from "@/components/Layout/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@/rules/validation";
import InputField from "@/components/common/InputField";

type LoginFormValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  contact: string;
  workingDays: any;
  duty_start_time: string;
  duty_end_time: string;
  isRoundingManager: boolean;
  image?: string;
};

const AddNurse: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      contact: "",
      workingDays: [],
      duty_start_time: "",
      duty_end_time: "",
      isRoundingManager: false,
      image: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("data", data);
  };

  return (
    <CustomeModal
      label="Add New Nurse"
      contentLabel="Nurse Modal"
      onConfirm={() => console.log("Button confirm")}
      onDiscard={() => console.log("Button discard")}
      buttons={[
        {
          role: "custom",
          onClick: () => reset(),
          classes:
            "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
          label: "Reset",
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
          classes:
            "bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200",
          label: "Confirm",
        },
      ]}
    >
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="First Name:"
            type="text"
            id="fistName"
            placeholder="First Name"
            register={register}
            name={"fistName"}
            errorMessage={errors?.firstName}
          />

          <InputField
            label="Last Name:"
            type="text"
            id="lastName"
            placeholder="Last Name"
            register={register}
            name="lastName"
            errorMessage={errors?.lastName}
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
            label="Email:"
            type="text"
            id="email"
            placeholder="nikesh@gmail.com"
            register={register}
            name="email"
            errorMessage={errors?.email}
          />

          <InputField
            label="Contact:"
            type="text"
            id="contact"
            placeholder="9898989898"
            register={register}
            name="contact"
            errorMessage={errors?.contact}
          />

          <InputField
            label="Duty start time:"
            type="text"
            id="duty_start_time"
            placeholder="Duty start time"
            register={register}
            name="duty_start_time"
            errorMessage={errors?.duty_start_time}
          />

          <InputField
            label="Duty end time:"
            type="text"
            id="duty_end_time"
            placeholder="Duty end time"
            register={register}
            name="duty_end_time"
            errorMessage={errors?.duty_end_time}
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
        </form>
      </div>
    </CustomeModal>
  );
};

export default AddNurse;
