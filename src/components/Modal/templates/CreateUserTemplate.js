import { useState } from "react";
import { Box, TextField, FormControl, Button } from "@mui/material";

const CreateUserTemplate = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "") {
      setError("Username cannot be empty.");
    } else {
      onSubmit({username});
      setUsername("");
      setError("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={handleInputChange}
          error={error !== ""}
          helperText={error}
        />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CreateUserTemplate;
