import { useMutation, useQueryClient } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";
import lendingQueryKeys from "./queryKeys";

const createUser = async (params) => {
  const { username } = params || {};
  const response = await lendingEndpoints.users.create(username);
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
