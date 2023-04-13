import { useQuery } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";
import lendingQueryKeys from "./queryKeys";

const getLoanSchedule =
  ({ loanID, userID }) =>
  async () => {
    const response = await lendingEndpoints.loans.getSchedule(loanID, userID);
    return response.data;
  };

const useQueryGetLoanSchedule = (params) => {
  const { loanID, userID } = params || {};
  return useQuery({
    queryKey: lendingQueryKeys.getLoanDetails(loanID),
    queryFn: getLoanSchedule(params),
    enabled: !!loanID && !!userID,
  });
};

export default useQueryGetLoanSchedule;
