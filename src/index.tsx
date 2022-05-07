import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Posts from "./ui/posts/Posts";
import Profile from "ui/profile/Profile";
import Signin from "ui/signin/Signin";
import Signup from "ui/signup/Signup";
import { AuthContextProvider } from "lib/context/authContext/authContext";
import ApolloProviderWrapper from "lib/ApolloProviderWrapper/ApolloProviderWrapper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApolloProviderWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Posts />} />
              <Route path="posts" element={<Posts />}></Route>
              <Route path="profile/:id" element={<Profile />}></Route>
              <Route path="signin" element={<Signin />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="*" element={<Navigate to="/" replace />}></Route>
            </Route>
          </Routes>
        </Router>
      </ApolloProviderWrapper>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
