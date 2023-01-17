import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

export const signupValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required(
      "Use 6 or more characters that contain a mixture of letters, digits, and symbols."
    )
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must not exceed 15 characters")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
  acceptAggrement: yup.bool().oneOf([true], "Please accept our policies"),
});
