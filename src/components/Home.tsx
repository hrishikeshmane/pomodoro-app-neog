import { Box, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { getFromStorage } from "../util";
import { IPomodoroContext, usePomodoro } from "../context/pomodoro-context";

const Home = () => {
  const theme = useTheme();

  const { todos } = usePomodoro() as IPomodoroContext;

  const [pendingToDosCount, setPendingToDosCount] = useState(() => {
    return todos.filter((todo) => todo.todoStatus.status !== "completed")
      .length;
  });

  useEffect(() => {
    setPendingToDosCount(
      todos.filter((todo) => todo.todoStatus.status !== "completed").length
    );
  }, [todos]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <Header />

      <Typography
        variant="h3"
        sx={{
          position: "absolute ",
          left: "4rem",
          top: "0.5rem",
          color: theme.palette.primary.contrastText,
        }}
      >
        Welcome back, {getFromStorage("displayName", "session", "User")}
      </Typography>
      <Typography
        sx={{
          position: "absolute ",
          left: "4rem",
          top: "4rem",
          color: theme.palette.primary.contrastText,
        }}
      >
        You have {pendingToDosCount} task pending
      </Typography>

      <Card
        sx={{
          position: "absolute ",
          left: "4rem",
          right: "0rem",
          top: "6rem",
          bottom: "0rem",
          borderTopLeftRadius: "20px",
          py: 5,
          pl: 6,
        }}
      >
        <Outlet />
      </Card>
    </Box>
  );
};

export default Home;
