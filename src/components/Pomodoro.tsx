import { Grid, Box, Typography, Button } from "@mui/material";
import { useTimer } from "react-timer-hook";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFromStorage } from "../util";
import {
  IPomodoroContext,
  IToDo,
  usePomodoro,
} from "../context/pomodoro-context";

const Pomodoro = () => {
  const params = useParams();
  const { todos, setTodos } = usePomodoro() as IPomodoroContext;
  const [task, setTask] = useState<IToDo>(() => {
    const _task = todos.filter((todo: IToDo) => todo.id === params.pomodoro);
    return _task[0];
  });
  const [timer, setTimer] = useState(() => {
    if (task.todoStatus.status === "paused") {
      const _time = new Date();
      _time.setSeconds(_time.getSeconds() + Number(task.todoStatus.time));
      return _time;
    }
    const _time = new Date();
    _time.setSeconds(_time.getSeconds() + Number(task.duration));
    return _time;
  });

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: timer,
      onExpire: () => completeTaskHandler(),
    });

  const completeTaskHandler = () => {
    // update todos with status
    setTodos(
      todos.map((todo) => {
        if (todo.id === params.pomodoro) {
          return {
            ...todo,
            todoStatus: {
              ...todo.todoStatus,
              status: "completed",
              time: new Date(),
            },
          };
        } else {
          return todo;
        }
      })
    );
  };

  const startTimerHandler = () => {
    if (!isRunning) {
      resume();
    }
  };

  const pauseTimerHandler = () => {
    if (isRunning) {
      pause();
      setTodos(
        todos.map((todo) => {
          if (todo.id === params.pomodoro) {
            return {
              ...todo,
              todoStatus: {
                ...todo.todoStatus,
                status: "paused",
                time: hours * 3600 + minutes * 60 + seconds,
              },
            };
          } else {
            return todo;
          }
        })
      );
    }
  };

  const restartTimerHandler = () => {
    const _time = new Date();
    _time.setSeconds(_time.getSeconds() + Number(task.duration));
    restart(_time);
    setTodos(
      todos.map((todo) => {
        if (todo.id === params.pomodoro) {
          return {
            ...todo,
            todoStatus: {
              ...todo.todoStatus,
              status: "pending",
              time: new Date(),
            },
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <Grid container sx={{ fontSize: "6rem" }} spacing={2}>
      <Grid
        item
        xs={5}
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", mx: 2, my: 4, justifyContent: "center" }}>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{ m: 1, width: "50%" }}
            disabled={isRunning}
            onClick={startTimerHandler}
          >
            Start
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1, width: "50%" }}
            disabled={!isRunning}
            onClick={pauseTimerHandler}
          >
            Pause
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{ m: 1, width: "100%" }}
            onClick={restartTimerHandler}
          >
            Restart
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ p: 5 }}>
        <Typography variant="h3" sx={{ my: 1 }}>
          {task?.title}
        </Typography>
        <Typography>{task?.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default Pomodoro;
