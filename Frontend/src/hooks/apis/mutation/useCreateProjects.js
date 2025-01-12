import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "../../../apis/projects";

export const useCreateProject = () => {
  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationFn: createProjectApi,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { createProjectMutation: mutateAsync, isPending, isSuccess, error };
};
