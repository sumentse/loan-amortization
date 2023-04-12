import { useQuery } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";
import lendingQueryKeys from "./queryKeys";

const getLoanSchedule = (loanID) => async () => {
  const response = await lendingEndpoints.loans.getSchedule(loanID);
  return response.data;
};

const useQueryGetLoanSchedule = (loanID) => {
  return useQuery({
    queryKey: lendingQueryKeys.getLoanDetails(loanID),
    queryFn: getLoanSchedule(loanID),
  });
};

export default useQueryGetLoanSchedule;
