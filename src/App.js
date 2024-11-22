import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={<h1 style={{ textAlign: "center" }}>404: Page Not Found</h1>}
        />
      </Routes>
    </Router>
  );
};

export default App;
