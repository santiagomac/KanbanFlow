import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { TaskPage } from "./TaskPage";
import { useEffect } from "react";
import { Pricing } from "./Pricing";

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    //setDark(theme === "dark" ? true : false);
    document.body.className = theme;
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-management" element={<TaskPage />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
