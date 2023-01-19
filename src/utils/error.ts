import { errorToast } from "./toast";

interface MyError extends Error {
  response?: {
    data?: {
      message?: string;
      data?: string;
    };
  };
}

export function handleError(err: MyError) {
  const error = err.response?.data;

  const title =
    error?.data?.toString() ??
    error?.message?.toString() ??
    "Something went wrong!";

  errorToast({ title });
}
