import PropTypes from "prop-types";
import {
  Modal as MaterialModal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CreateUserTemplate from "./templates/CreateUserTemplate";
import CreateLoanTemplate from "./templates/CreateLoanTemplate";
import ShareLoanTemplate from "./templates/ShareLoanTemplate";
import ViewUserLoansTemplate from "./templates/ViewUserLoansTemplate";

const StyledContainer = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    backgroundColor: theme.palette.background.paper,
    border: `2px solid black`,
    boxShadow: 24,
    borderRadius: 10,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      top: "initial",
      left: "initial",
      transform: "none",
      width: "initial",
      height: "100%",
    },
  };
});

const Modal = ({
  onSubmit,
  closeModal,
  isLoading,
  open,
  type,
  data,
  isError,
}) => {
  const modalTemplates = {
    createUser: {
      title: "Create User",
      component: CreateUserTemplate,
      props: {
        onSubmit,
      },
    },
    createLoan: {
      title: "Create Loan",
      component: CreateLoanTemplate,
      props: {
        onSubmit,
        userID: data.userID,
      },
    },
    shareLoan: {
      title: "Share loan",
      component: ShareLoanTemplate,
      props: {
        onSubmit,
        isError,
        shareLoanError: data.shareLoanError,
      },
    },
    viewLoan: {
      title: "View User Loan",
      component: ViewUserLoansTemplate,
      props: {
        userLoans: data.userLoans || [],
        isLoading: isLoading,
      },
    },
  };

  const {
    title,
    component: Component,
    props: templateProps,
  } = modalTemplates?.[type] || {};

  return (
    <MaterialModal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal"
      aria-describedby="modal"
      keepMounted
    >
      <StyledContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            {title || ""}
          </Typography>
          <IconButton onClick={closeModal} color="error">
            <CancelIcon fontSize="medium" />
          </IconButton>
        </Box>
        {Component && <Component {...templateProps} />}
      </StyledContainer>
    </MaterialModal>
  );
};

Modal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Modal;
