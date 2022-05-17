import { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Route, Routes, useNavigate } from "react-router-dom";
import Todos from "./components/Todos";
import Pomodoro from "./components/Pomodoro";
import { PomodoroProvider } from "./context/pomodoro-context";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="App">
      <PomodoroProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Todos />} />
              <Route path=":pomodoro" element={<Pomodoro />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </PomodoroProvider>
    </div>
  );
}

export default App;
