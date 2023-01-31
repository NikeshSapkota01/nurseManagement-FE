export interface AddNurseValue {
  id?: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  contact: string;
  working_days: any;
  duty_start_time: string;
  duty_end_time: string;
  isRoundingManager: boolean;
  image?: string;
  nurseImage?: any;
}

export interface ValueOption {
  value: string;
  label: string;
}

export interface FetchNurseDataType {
  data: any;
  status:
    | "idle"
    | "loading"
    | "succeeded"
    | "failed"
    | "fullfilled"
    | "updated";
  error: string | null | undefined;
}

export interface FileUpload {
  name: string;
  setValue: any;
}
