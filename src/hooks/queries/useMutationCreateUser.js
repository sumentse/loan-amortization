import { useMutation } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";

const createUser = async (userName) => {
  const response = await lendingEndpoints.users.create(userName);
  return response.data;
};

const useMutationCreateUser = () => {
  return useMutation(createUser, {
    onSuccess: () => {
      // Add any success logic here
    },
    onError: (error) => {
      // Add any error handling logic here
    },
  });
};

export default useMutationCreateUser;
