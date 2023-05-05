import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (email && password) {
      console.log(email, password);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        boxShadow: 12,
      }}
    >
      <Box
        spacing={3}
        sx={{
          maxWidth: 300,
          height: 300,
        }}
      >
        <form noValidate onSubmit={handleSubmit}>
          <h2>Login form</h2>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            color="secondary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type={showPassword ? "text" : "password"}
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" color="primary" type="submit">
            Login
          </Button>
        </form>
        <small>
          Need an account? <Link to="/">Register </Link>
        </small>
      </Box>
    </Container>
  );
};

export default Login;
