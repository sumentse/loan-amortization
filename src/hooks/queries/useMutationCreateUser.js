import { useMutation, useQueryClient } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";
import lendingQueryKeys from "./queryKeys";

const createUser = async (userName) => {
  const response = await lendingEndpoints.users.create(userName);
  return response.data;
};

const useMutationCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(lendingQueryKeys.listUsers());
    },
    onError: (error) => {
      // Add any error handling logic here
    },
  });
};

export default useMutationCreateUser;
