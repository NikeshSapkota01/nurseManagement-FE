import { post } from "@/utils/httpUtils";
import endpoints from "src/constants/endpoint";

interface IUserLogin {
  email: string;
  password: string;
}
interface IUserSignUp extends IUserLogin {
  name: string;
  acceptAggrement: boolean;
}

export const createUsers = async (payload: IUserSignUp) => {
  const { data } = await post(endpoints.users.createUser, payload);
  return data;
};

export const login = async (payload: IUserLogin) => {
  const { data } = await post(endpoints.auth.login, payload);
  return data?.data;
};
