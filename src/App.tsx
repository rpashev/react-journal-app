import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Layout/Navigation";
import AuthContext from "./context/user-context";
import JournalsList from "./pages/JournalsList";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import SingleJournal from "./pages/SingleJournal";
import React from "react";
import SnackbarMessage from "./components/UI/SnackbarMessage";

function App() {
  const context = useContext(AuthContext);
  const { isLoggedIn } = context;

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={isLoggedIn ? <JournalsList /> : <Login />} />
        <Route
          path="/logout"
          element={isLoggedIn ? <Logout /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/journals/:journalId"
          element={isLoggedIn ? <SingleJournal /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <SnackbarMessage />
    </BrowserRouter>
  );
}

export default App;
