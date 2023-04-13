import lendingQueryKeys from "./queryKeys";
import { useQuery } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";

const getUserLoan = (userID) => async () => {
  const response = await lendingEndpoints.users.listLoans(userID);
  return response.data;
};

const useQueryGetUserLoan = (params) => {
  const { userID } = params || {};
  return useQuery({
    queryKey: lendingQueryKeys.getUserLoans(userID),
    queryFn: getUserLoan(userID),
    enabled: !!userID,
  });
};

export default useQueryGetUserLoan;
