import { useMutation } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";

const createLoan = async (params) => {
  const { amount, apr, term, status, owner_id } = params || {};
  const response = await lendingEndpoints.loan.create({
    amount,
    apr,
    term,
    status,
    owner_id,
  });
  return response.data;
};

const useMutationCreateLoan = () => {
  return useMutation(createLoan, {
    onSuccess: () => {
      // Add any success logic here
    },
    onError: (error) => {
      // Add any error handling logic here
    },
  });
};

export default useMutationCreateLoan;
