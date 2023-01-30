import { handleError } from "./error";

export function withToastForError<Args, Returned>(
  payloadCreator: (args: Args) => Promise<Returned>
) {
  return async (args: Args) => {
    try {
      return await payloadCreator(args);
    } catch (error: any) {
      handleError(error);
      throw error.data;
    }
  };
}
