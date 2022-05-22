import { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(
        "Auth Token",
        //@ts-ignore
        JSON.stringify(user?._tokenResponse?.refreshToken)
      );
      sessionStorage.setItem("photoURL", JSON.stringify(user.user.photoURL));
      sessionStorage.setItem(
        "displayName",
        JSON.stringify(user.user.displayName)
      );
      navigate("/");
    }
  }, [user, navigate]);

  const loginHandler = () => {
    signInWithGoogle();
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {!loading && !error && (
        <Button
          variant="contained"
          onClick={loginHandler}
          sx={{
            px: 4,
            py: 2,
            fontSize: "large",
          }}
        >
          Login with Google
        </Button>
      )}
      {loading && (
        <Typography sx={{ color: theme.palette.primary.main }} variant="h3">
          Logging in...
        </Typography>
      )}
      {error && (
        <Typography sx={{ color: theme.palette.primary.main }} variant="h4">
          Error: {error.message}
        </Typography>
      )}
    </Box>
  );
};

export default Login;
