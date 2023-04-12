import lendingQueryKeys from "./queryKeys";
import { useQuery } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";

const listAllUsers = () => async () => {
  const response = await lendingEndpoints.users.list();
  return response.data;
};

const useQueryListAllUsers = () => {
  return useQuery({
    queryKey: lendingQueryKeys.listUsers(),
    queryFn: listAllUsers(),
  });
};

export default useQueryListAllUsers;
