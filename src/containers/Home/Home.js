import { Typography, Box, Button, Alert } from "@mui/material";
import { useEffect, useCallback } from "react";
import Table from "@components/Table";
import { styled } from "@mui/material/styles";
import { LoadingScreen, Modal, ActionButtons } from "@components";
import useModal from "@hooks/useModal";
import useQueryListAllUsers from "@hooks/queries/useQueryListAllUsers";
import useQueryGetUserLoan from "@hooks/queries/useQueryGetUserLoan";
import useMutationCreateUser from "@hooks/queries/useMutationCreateUser";
import useMutationCreateLoan from "@hooks/queries/useMutationCreateLoan";
import useMutationShareLoan from "@hooks/queries/useMutationShareLoan";
import { useMainAction, useMainState } from "@contexts/mainContext";

const columns = [
  { headerName: "id", field: "id" },
  { headerName: "user name", field: "username" },
  { headerName: "action", field: "action" },
];

const StyledButton = styled(Button)(({ theme }) => {
  return {
    marginRight: theme.spacing(2),
  };
});

const Home = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const { modalType, selectedUserID } = useMainState();
  const { setModalType, setSelectedUserID } = useMainAction();

  const {
    data: UserList,
    isLoading: isUserListLoading,
    isError: isUserListError,
  } = useQueryListAllUsers();
  const {
    data: userLoans,
    isLoading: isUserLoansLoading,
    isError: isUserLoansError,
  } = useQueryGetUserLoan({ userID: selectedUserID });
  const {
    mutate: createUser,
    isLoading: isCreateUserLoading,
    isSuccess: isCreateUserSuccess,
    reset: resetCreateUser,
    isError: isCreateUserError,
  } = useMutationCreateUser();
  const {
    mutate: createLoan,
    isLoading: isCreateLoanLoading,
    isSuccess: isCreateLoanSuccess,
    reset: resetCreateLoan,
    isError: isCreateLoanError,
  } = useMutationCreateLoan();
  const {
    mutate: shareLoan,
    error: shareLoanError,
    isLoading: isShareLoanLoading,
    isSuccess: isShareLoanSuccess,
    reset: resetShareLoan,
    isError: isShareLoanError,
  } = useMutationShareLoan();

  const resetMutateState = useCallback(() => {
    resetCreateUser();
    resetCreateLoan();
    resetShareLoan();
  }, [resetCreateLoan, resetCreateUser, resetShareLoan]);

  useEffect(() => {
    if (isCreateUserSuccess || isCreateLoanSuccess || isShareLoanSuccess) {
      resetMutateState();
      closeModal();
    }
  }, [
    closeModal,
    isCreateLoanSuccess,
    isCreateUserSuccess,
    isShareLoanSuccess,
    resetMutateState,
  ]);

  const handleOpenModal = (type) => {
    setModalType(type);
    openModal();
  };

  const handleCloseModal = () => {
    resetMutateState();
    closeModal();
  };

  const renderTable = () => {
    if (isUserListError) {
      return (
        <Alert severity="error">
          Something went wrong please try again later
        </Alert>
      );
    }

    const userListWithActions = UserList.map((user) => {
      return {
        ...user,
        action: (
          <ActionButtons
            userID={user.id}
            setSelectedUserID={setSelectedUserID}
            openModal={openModal}
            setModalType={setModalType}
          />
        ),
      };
    });

    return <Table rows={userListWithActions} columns={columns} />;
  };

  const handleFormSubmit = (data) => {
    const formSubmit = {
      createUser: () => createUser(data),
      createLoan: () => createLoan(data),
      shareLoan: () => shareLoan(data),
    };
    if (modalType) {
      formSubmit[modalType]();
    }
  };

  return (
    <Box sx={{ my: 10 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Loan Amortization
      </Typography>
      {isUserListLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal("createUser")}
            >
              Create User
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal("shareLoan")}
            >
              Share Loan
            </StyledButton>
          </Box>
          {renderTable()}
          <Modal
            open={isOpen}
            type={modalType}
            data={{
              userLoans,
              userID: selectedUserID,
              shareLoanError,
            }}
            closeModal={handleCloseModal}
            isLoading={
              isCreateUserLoading ||
              isCreateLoanLoading ||
              isUserLoansLoading ||
              isShareLoanLoading
            }
            isError={
              isCreateUserError ||
              isCreateLoanError ||
              isUserLoansError ||
              isShareLoanError
            }
            onSubmit={handleFormSubmit}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
