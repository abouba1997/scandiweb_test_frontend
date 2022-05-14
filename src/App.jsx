import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import AddForm from "./components/AddForm/AddForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/addproduct" element={<AddForm />} />
      </Routes>
    </Router>
  );
};

export default App;
