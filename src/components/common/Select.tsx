import React, { useState } from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import Select, { OnChangeValue } from "react-select";

import { ValueOption } from "src/constants/interface";

interface SelectFieldProps {
  name: string;
  label: string;
  control: any;
  children?: React.ReactNode;
  errorMessage:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  required?: boolean;
  setValue?: any;
  option: readonly ValueOption[];
}

const SelectField = (props: SelectFieldProps) => {
  const {
    control,
    label,
    name,
    errorMessage,
    required,
    children,
    setValue,
    option,
  } = props;

  const [selectedValue, setSeletectedValue] =
    useState<readonly ValueOption[]>();

  const onChange = (newValue: OnChangeValue<ValueOption, true>) => {
    const value = newValue?.map((days) => days.value);
    setValue(name, value);

    return setSeletectedValue(newValue);
  };

  return (
    <div className="field">
      <div className="mb-4">
        <label
          htmlFor="name"
          className={`block font-medium text-sm mb-2 ${
            errorMessage ? "text-red-600" : "text-grey-900"
          }`}
        >
          {label}
          {required && " *"}
        </label>
        <div>
          <Controller
            name={name}
            control={control}
            render={(rest) => (
              <Select
                isMulti
                isClearable
                value={selectedValue}
                onChange={onChange}
                options={option}
                {...rest}
              />
            )}
          />
        </div>
        {errorMessage && (
          <p className="text-red-600 text-sm mt-1">Error in {label}</p>
        )}
        {children}
      </div>
    </div>
  );
};

export default SelectField;
