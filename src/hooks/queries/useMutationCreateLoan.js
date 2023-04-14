import { useMutation, useQueryClient } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";
import lendingQueryKeys from "./queryKeys";

const createLoan = async (params) => {
  const { amount, apr, term, status, owner_id } = params || {};
  const response = await lendingEndpoints.loans.create({
    amount,
    apr,
    term,
    status,
    owner_id,
  });
  return response.data;
};

const useMutationCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation(createLoan, {
    onSuccess: ({ owner_id }) => {
      queryClient.invalidateQueries(lendingQueryKeys.getUserLoans(owner_id));
    },
    onError: (error) => {
      // Add any error handling logic here
    },
  });
};

export default useMutationCreateLoan;
