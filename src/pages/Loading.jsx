import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Loading = () => {
  return (
    <div>
      <ClipLoader
        color={"white"}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
