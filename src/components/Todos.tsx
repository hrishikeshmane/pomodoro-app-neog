import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import {
  IPomodoroContext,
  IToDo,
  usePomodoro,
} from "../context/pomodoro-context";
import { nanoid } from "nanoid";
import { getFromStorage } from "../util";

const Todos = () => {
  const { todos, setTodos } = usePomodoro() as IPomodoroContext;
  const [tasks, setTasks] = useState<Array<IToDo>>(
    getFromStorage("todos", "local", todos)
  );
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogOption, setDialogOption] = useState<"Add" | "Save">("Add");
  const [dialogFields, setDialogFields] = useState<IToDo>({
    id: nanoid(),
    title: "",
    description: "",
    duration: "",
    todoStatus: { status: "pending" },
  });

  useEffect(() => {
    setTodos(tasks);
  }, [tasks, setTodos]);

  const handleDialogField = (newFields: IToDo) => {
    setDialogFields(newFields);
  };

  const resetDialogFields = () => {
    handleDialogField({
      id: nanoid(),
      title: "",
      description: "",
      duration: "",
      todoStatus: { status: "pending" },
    });
  };

  const addNewToDo = () => {
    setDialogOption("Add");
    resetDialogFields();
    setOpenDialog(true);
  };

  const saveNewToDo = () => {
    setTasks([...tasks, dialogFields]);
    resetDialogFields();
    setOpenDialog(false);
  };

  const deleteToDo = (id: string) => {
    setTasks(tasks.filter((todo) => todo.id !== id));
  };

  const editToDo = (todo: IToDo) => {
    setDialogOption("Save");
    setOpenDialog(true);
    setDialogFields({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      duration: todo.duration,
      todoStatus: todo.todoStatus,
    });
  };

  const saveEditedToDo = (id: string) => {
    setTasks(tasks.map((todo) => (todo.id === id ? dialogFields : todo)));
    resetDialogFields();
    setOpenDialog(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", mr: 3, mb: 2 }}>
        {tasks.length > 0 ? (
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: theme.palette.grey[800],
            }}
          >
            Your To-Do list
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            Your To-Do list is empty
          </Typography>
        )}
        <IconButton
          onClick={addNewToDo}
          sx={{
            ml: "auto",
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
            ":hover": {
              background: theme.palette.primary.dark,
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box sx={{ height: "99%", overflow: "auto" }}>
        {tasks.map((task) => (
          <Box
            key={task.id}
            sx={{
              display: "flex",
              alignItems: "center",
              m: 1,
              py: 0.5,
              px: 2,
              background: theme.palette.primary[100],
              borderRadius: "7px",
              transition: "transform 300ms",
              ":hover": {
                transform: "scale(1.004)",
              },
            }}
          >
            <IconButton
              disabled={task.todoStatus.status === "completed"}
              onClick={() => navigate(`/${task.id}`)}
              sx={{
                color: theme.palette.primary.light,
                p: 0.2,
                mr: 0.5,
              }}
            >
              <PlayCircleFilledWhiteIcon fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                width: "auto",
                textDecoration:
                  task.todoStatus.status === "completed"
                    ? "line-through"
                    : "none",
                color:
                  task.todoStatus.status === "completed" ? "#898686" : "none",
              }}
            >
              {task.title}
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <IconButton
                onClick={() => editToDo(task)}
                sx={{
                  color: theme.palette.primary.light,
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => deleteToDo(task.id)}
                sx={{ color: theme.palette.primary.light }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={openDialog}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle>
          <TextField
            fullWidth
            value={dialogFields.title}
            placeholder="Title"
            label="Title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDialogFields({ ...dialogFields, title: e.target.value });
            }}
          ></TextField>
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            placeholder="Description"
            fullWidth
            multiline
            maxRows={5}
            value={dialogFields.description}
            label="Description"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDialogFields({ ...dialogFields, description: e.target.value });
            }}
          ></TextField>
          <TextField
            type="number"
            sx={{ mt: 1 }}
            fullWidth
            value={dialogFields.duration}
            placeholder="Duration"
            label="Duration"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDialogFields({ ...dialogFields, duration: +e.target.value });
            }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ px: 2, mr: 2 }}
            onClick={
              dialogOption === "Save"
                ? () => saveEditedToDo(dialogFields.id)
                : saveNewToDo
            }
          >
            {dialogOption === "Save" ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Todos;
