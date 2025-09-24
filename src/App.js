
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeadsTable from "./app/showLead";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />      
        <Routes>
          <Route path="/" element={<LeadsTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
