import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const initialFormState = {
  amount: 0,
  apr: 0,
  term: 0,
  status: "active",
};

const validateForm = (formData) => {
  let errors = {};
  if (formData.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }
  if (formData.apr <= 0) {
    errors.apr = "APR must be greater than 0";
  }
  if (formData.term <= 0) {
    errors.term = "Term must be greater than 0";
  }

  return errors;
};

const CreateLoanTemplate = ({ onSubmit, userID }) => {
  const [formData, setFormData] = useState({
    ...initialFormState,
    owner_id: userID,
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
          name="amount"
          label="Amount"
          type="number"
          value={formData.amount}
          onChange={handleInputChange}
          error={!!formErrors.amount}
          helperText={formErrors.amount}
        />
        <TextField
          name="apr"
          label="APR"
          type="number"
          value={formData.apr}
          onChange={handleInputChange}
          error={!!formErrors.apr}
          helperText={formErrors.apr}
        />
        <TextField
          name="term"
          label="Term"
          type="number"
          value={formData.term}
          onChange={handleInputChange}
          error={!!formErrors.term}
          helperText={formErrors.term}
        />
      </Box>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CreateLoanTemplate;
