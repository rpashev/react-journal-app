import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Layout/Navigation";
import AuthContext from "./context/user-context";
import CreateEntry from "./pages/CreateEntry/CreateEntry";
import CreateJournal from "./pages/CreateJournal/CreateJournal";
import EditEntry from "./pages/EditEntry/EditEntry";
import JournalsList from "./pages/JournalsList/JournalsList";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import Register from "./pages/Register/Register";
import SingleEntry from "./pages/SingleEntry/SingleEntry";
import SingleJournal from "./pages/SingleJournal/SingleJournal";
import React from "react";
import SnackbarMessage from "./components/UI/SnackbarMessage";

function App() {
  const context = useContext(AuthContext);
  const { isLoggedIn } = context;
  console.log(isLoggedIn);

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
        <Route
          path="/journals/:journalId/:entryId"
          element={isLoggedIn ? <SingleEntry /> : <Navigate to="/" />}
        />
        <Route
          path="/journals/create-journal"
          element={isLoggedIn ? <CreateJournal /> : <Navigate to="/" />}
        />
        <Route
          path="/journals/:journalId/create-entry"
          element={isLoggedIn ? <CreateEntry /> : <Navigate to="/" />}
        />
        <Route
          path="/journals/:journalId/:entryId/edit"
          element={isLoggedIn ? <EditEntry /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <SnackbarMessage />
    </BrowserRouter>
  );
}

export default App;
