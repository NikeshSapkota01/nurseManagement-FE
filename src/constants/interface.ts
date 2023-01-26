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
