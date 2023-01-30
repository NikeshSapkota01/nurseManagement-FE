import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

import { object, string, array, mixed, boolean, bool } from "yup";
import { WorkingDays } from "src/constants/constant";

export const signupValidationSchema = object({
  name: string().required("Name is required"),
  email: string().required("Email is required").email("Email is invalid"),
  password: string()
    .required(
      "Use 6 or more characters that contain a mixture of letters, digits, and symbols."
    )
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must not exceed 15 characters")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
  acceptAggrement: bool().oneOf([true], "Please accept our policies"),
});

export const loginValidationSchema = object({
  email: string().required("Email is required").email("Email is invalid"),
  password: string()
    .required(
      "Use 6 or more characters that contain a mixture of letters, digits, and symbols."
    )
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must not exceed 15 characters")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
});

export const createNurseSchema = object({
  firstName: string().required("First Name is required").max(128),
  middleName: string().max(128),
  lastName: string().required("Last Name is required").max(128),
  email: string().required("Email is required").email("Invalid email").max(128),
  contact: string().required("Contact is required").max(20),
  working_days: array().of(mixed().oneOf(Object.values(WorkingDays))),
  duty_start_time: string().required("Start time must be hh:mm format"),
  duty_end_time: string().when("duty_start_time", (startTime, schema) => {
    if (startTime) {
      return schema
        .required("End time is required.")
        .test(
          "end-time-greater-than-start-time",
          "End time must be greater than start time.",
          function (value: string) {
            return (
              new Date(`1970-01-01T${value}`) >
              new Date(`1970-01-01T${startTime}`)
            );
          }
        );
    }
    return schema;
  }),
  image: string().max(1024),
  isRoundingManager: boolean(),
});
