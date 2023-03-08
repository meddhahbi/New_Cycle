import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Login from "./Login";

function App() {
  return (
    // <div>
    //   welcome to app
    // </div>
    <Routes>
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
  );
}

export default App;
