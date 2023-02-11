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
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="signUp" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/">
          <Route path="profile" element={<Profile />} />
          <Route path="feed" element={<Feed />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
