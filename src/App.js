import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import NoMatch from "./components/NoMatch";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="signup" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
