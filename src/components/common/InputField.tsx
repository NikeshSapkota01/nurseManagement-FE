import React from "react";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

interface InputFieldProps {
  type: string;
  id: string;
  label: string;
  placeholder: string;
  register: any;
  name: string;
  errorMessage: FieldError | undefined;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

class InputField extends React.Component<InputFieldProps> {
  render() {
    const {
      type,
      label,
      id,
      register,
      name,
      errorMessage,
      placeholder,
      icon,
      children,
    } = this.props;

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
          </label>
          <div className={`${icon && "flex relative"}`}>
            <input
              className={`form-control block w-full px-4 text-sm font-normal text-grey-700 bg-white border border-solid border-grey-300 rounded h-10 focus:text-grey-900 focus:bg-white focus:border-blue-600 focus:outline-none focus:shadow-md focus:shadow-blue-300 ${
                errorMessage &&
                "text-red-300 border-red-600 focus:border-red-600 focus:shadow-red-300"
              }`}
              type={type}
              id={id}
              placeholder={placeholder}
              {...register(name)}
            />
            {icon}
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm mt-1">{errorMessage.message}</p>
          )}
          {children}
        </div>
      </div>
    );
  }
}

export default InputField;
