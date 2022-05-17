import { nanoid } from "nanoid";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IToDoStatus {
  status: "pending" | "completed" | "paused";
  time?: any;
}

export interface IToDo {
  id: string;
  title: string;
  description: string;
  duration: Number | string;
  todoStatus: IToDoStatus;
}

export interface IPomodoroContext {
  todos: IToDo[];
  setTodos: React.Dispatch<React.SetStateAction<IToDo[]>>;
}

export interface IPomodoroProvider {
  children: ReactNode;
}

const PomodoroContext = createContext<IPomodoroContext | null>(null);

const PomodoroProvider = ({ children }: IPomodoroProvider) => {
  const [todos, setTodos] = useState<Array<IToDo>>([
    {
      id: nanoid(),
      title: "History Homework",
      description: "Complete History Homework regarding World war 2",
      duration: 3600, //60 mins
      todoStatus: { status: "pending" },
    },
    {
      id: nanoid(),
      title: "Practice Interview Prep",
      description: "Practive Interview prep question on javascript",
      duration: 5400, //90 mins
      todoStatus: { status: "pending" },
    },
  ]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <PomodoroContext.Provider value={{ todos, setTodos }}>
      {children}
    </PomodoroContext.Provider>
  );
};

const usePomodoro = () => useContext(PomodoroContext);

export { PomodoroProvider, usePomodoro };
