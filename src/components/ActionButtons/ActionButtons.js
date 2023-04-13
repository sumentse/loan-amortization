import { useState, useRef } from "react";

import {
  Paper,
  Grow,
  Button,
  Popper,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";

const ActionButtons = ({
  userID,
  setSelectedUserID,
  openModal,
  setModalType,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClick = () => setOpen((prevOpen) => !prevOpen);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleModal = (modalType) => {
    switch (modalType) {
      case "viewLoan":
        setSelectedUserID(userID);
        break;
      case "createLoan":
        break;
      case "shareLoan":
        break;
      default:
        break;
    }
    setModalType(modalType);
    openModal();
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="action"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Actions
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "bottom-start",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => handleModal("viewLoan")}>
                    View Loan
                  </MenuItem>
                  <MenuItem onClick={() => handleModal("createLoan")}>
                    Create Loan
                  </MenuItem>
                  <MenuItem onClick={() => handleModal("shareLoan")}>
                    Share Loan
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ActionButtons;
