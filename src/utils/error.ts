import { errorToast } from "./toast";

interface MyError extends Error {
  data?: {
    message?: string;
    data?: string;
  };
}

export function handleError(err: MyError) {
  console.log("🚀 ~ file: error.ts:11 ~ handleError ~ err", err);
  const error =
    err?.data?.data || err.data?.message?.toString() || err?.data?.toString();

  const title = error ?? "Something went wrong!";

  errorToast({ title });
}
