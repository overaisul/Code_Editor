import { useQuery } from "@tanstack/react-query";
import { pingApi } from "../../../apis/ping";

export default function usePing() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "ping",
    queryFn: pingApi,
    staleTime: 10000,
  });

  return { data, isLoading, isError, error };
}
