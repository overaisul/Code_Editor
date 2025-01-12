import { useParams } from "react-router-dom";

export const ProjectPlayground = () => {
  const { projectId } = useParams();
  return (
    <>
      <h1>{projectId}</h1>
    </>
  );
};
