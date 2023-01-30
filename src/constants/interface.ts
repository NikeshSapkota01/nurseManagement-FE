export interface AddNurseValue {
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
}

export interface ValueOption {
  value: string;
  label: string;
}

export interface GetNurseResponseData {
  data: {
    0: {
      id: number;
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      contact: string;
      working_days: any;
      duty_start_time: string;
      duty_end_time: string;
      isRoundingManager: boolean;
      image: string;
      created_at: string;
      created_by: number;
      is_deleted: boolean;
    };
  };
}
export interface FetchNurseDataType {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed" | "fullfilled";
  error: string | null | undefined;
  individualData: any;
  individualDataStatus: "loading" | "succeeded" | "failed";
}
