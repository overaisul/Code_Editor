import usePing from "../../hooks/apis/queries/usePing";

export const PingComponent = () => {
  const { isLoading, data } = usePing();
  if (isLoading) {
    return (
      <>
        <h1>Loading..</h1>
      </>
    );
  }
  return (
    <>
      <h1>Hello {data.message}</h1>
    </>
  );
};
