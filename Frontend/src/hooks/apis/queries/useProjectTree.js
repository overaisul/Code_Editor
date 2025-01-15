import { useQuery } from "@tanstack/react-query";
import { getProjectTree } from "../../../apis/projects";

export const useProjectTree = ({ projectId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getProjectTree({ projectId }),
  });

  return { projectTree: data, isLoading, isError, error };
};
