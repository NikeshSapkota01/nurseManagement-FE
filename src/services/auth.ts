import { post } from "@/utils/httpUtils";
import endpoints from "src/constants/endpoint";

interface createUsers {
  name: string;
  email: string;
  password: string;
  acceptAggrement: boolean;
}

interface login {
  email: string;
  password: string;
}

export const createUsers = async (payload: createUsers) => {
  const { data } = await post(endpoints.users.createUser, payload);
  return data;
};

export const login = async (payload: login) => {
  const { data } = await post(endpoints.auth.login, payload);
  return data;
};
