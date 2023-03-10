import React, { useEffect, useState } from "react";
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import Select, { OnChangeValue } from "react-select";

import { ValueOption } from "src/constants/interface";
import { WorkingDaysOption } from "src/constants/constant";

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
  const defaultValue = control._defaultValues.working_days;
  const [selectedValue, setSelectedValue] = useState<readonly ValueOption[]>();

  const onChange = (newValue: OnChangeValue<ValueOption, true>) => {
    const value = newValue?.map((days) => days.value);
    setValue(name, value);

    return setSelectedValue(newValue);
  };

  useEffect(() => {
    const selectedWorkingDays = WorkingDaysOption.filter((day) =>
      defaultValue.includes(day.value)
    );
    if (selectedWorkingDays.length > 0) {
      setSelectedValue(selectedWorkingDays);
      // remove curly brace and convert to array
      let toArray = defaultValue.slice(1, -1).split(",");
      // remove the "" from the array to suit our format
      let formatedData = toArray.map((item: string) =>
        item.replace(/^"|"$/g, "")
      );
      setValue(name, formatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, name]);

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
