import { post } from "@/utils/httpUtils";
import endpoints from "src/constants/endpoint";

interface createUsers {
  name: string;
  email: string;
  password: string;
  acceptAggrement: boolean;
}

export const createUsers = async (body: createUsers) => {
  return await post(endpoints.users.createUser, body);
};
