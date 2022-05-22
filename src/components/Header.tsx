import React, { useState } from "react";
import { Avatar, Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFromStorage } from "../util";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    displayName: getFromStorage("displayName", "session", "User"),
    photoURL: getFromStorage("photoURL", "session", ""),
  });

  return (
    <Box component="header" sx={{ py: 1, px: 3 }}>
      <Tooltip title="Logout">
        <Avatar
          src={user.photoURL}
          alt={user.displayName}
          sx={{ ml: "auto", cursor: "pointer" }}
          onClick={() => {
            sessionStorage.clear();
            localStorage.clear();
            navigate("/login");
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default Header;
