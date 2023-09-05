import { useQuery } from "@tanstack/react-query";
import User from "../entities/User";
import apiClient from "../services/apiClient";

const useAuth = (id: string) =>
  useQuery<User, Error>({
    queryKey: ["auth", id],
    queryFn: () => apiClient.get<User>(`/users/${id}`).then((res) => res.data),
  });

export default useAuth;