import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <CircularProgress
      color="secondary"
      size="4rem"
      sx={{ margin: "0 auto", display: "block" }}
    />
  );
};
export default Spinner;
