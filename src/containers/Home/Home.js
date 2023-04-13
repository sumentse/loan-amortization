import { Typography, Box, Button, Alert } from "@mui/material";
import { useEffect } from "react";
import Table from "@components/Table";
import { styled } from "@mui/material/styles";
import { LoadingScreen, Modal, ActionButtons } from "@components";
import useModal from "@hooks/useModal";
import useQueryListAllUsers from "@hooks/queries/useQueryListAllUsers";
import useQueryGetUserLoan from "@hooks/queries/useQueryGetUserLoan";
import useMutationCreateUser from "@hooks/queries/useMutationCreateUser";
import useMutationCreateLoan from "@hooks/queries/useMutationCreateLoan";
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
  const { modalType, selectedUserID, selectedLoanID } = useMainState();
  const { setModalType, setSelectedUserID, setSelectedLoanID } =
    useMainAction();

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

  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const resetMutation = {
      createUser: resetCreateUser,
      createLoan: resetCreateLoan,
    };
    if (isCreateUserSuccess || isCreateLoanSuccess) {
      closeModal();
      resetMutation?.[modalType]?.();
    }
  }, [
    closeModal,
    modalType,
    isCreateLoanSuccess,
    isCreateUserSuccess,
    resetCreateLoan,
    resetCreateUser,
  ]);

  const handleOpenModal = (type) => (event) => {
    setModalType(type);
    openModal();
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
      createUser: createUser(data),
      createLoan: console.log("create loan", data),
      shareLoan: console.log("share loan", data),
    };
    return formSubmit?.[modalType];
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
              onClick={handleOpenModal("createUser")}
            >
              Create User
            </StyledButton>
          </Box>
          {renderTable()}
          <Modal
            open={isOpen}
            type={modalType}
            data={{
              userLoans,
            }}
            closeModal={closeModal}
            isLoading={isCreateUserLoading || isCreateLoanLoading}
            isError={isCreateUserError || isCreateLoanError}
            onSubmit={handleFormSubmit}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
