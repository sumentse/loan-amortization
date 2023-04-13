import PropTypes from "prop-types";
import { CircularProgress, Box } from "@mui/material";

const LoadingScreen = ({ styles }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        ...styles,
      }}
    >
      <CircularProgress data-testid="loading-screen" />
    </Box>
  );
};

LoadingScreen.propTypes = {
  styles: PropTypes.object,
};

export default LoadingScreen;
