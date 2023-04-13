import PropTypes from 'prop-types';
import { useState } from "react";
import { Box, Button, TextField, Alert } from "@mui/material";

const initialFormState = {
  ownerID: 0,
  loanID: 0,
  userID: 0,
};

const validateForm = (formData) => {
  let errors = {};
  if (formData.ownerID <= 0) {
    errors.ownerID = "ownerID must be greater than 0";
  }
  if (formData.loanID <= 0) {
    errors.loanID = "loanID must be greater than 0";
  }
  if (formData.userID <= 0) {
    errors.userID = "userID must be greater than 0";
  }

  return errors;
};

const ShareLoanTemplate = ({ onSubmit, isError, shareLoanError }) => {
  const [formData, setFormData] = useState({
    ...initialFormState,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: +value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
      setFormData(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
        <TextField
          name="loanID"
          label="loanID"
          type="number"
          value={formData.loanID}
          onChange={handleInputChange}
          error={!!formErrors.loanID}
          helperText={formErrors.loanID}
        />
        <TextField
          name="ownerID"
          label="ownerID"
          type="number"
          value={formData.ownerID}
          onChange={handleInputChange}
          error={!!formErrors.ownerID}
          helperText={formErrors.ownerID}
        />
        <TextField
          name="userID"
          label="userID"
          type="number"
          value={formData.userID}
          onChange={handleInputChange}
          error={!!formErrors.userID}
          helperText={formErrors.userID}
        />
      </Box>
      {isError && (
        <Alert sx={{ my: 2 }} severity="error">
          {shareLoanError?.data?.detail || "Something went wrong"}
        </Alert>
      )}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

ShareLoanTemplate.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    shareLoanError: PropTypes.string,
}

export default ShareLoanTemplate;
