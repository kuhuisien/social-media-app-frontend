import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Posts from "./ui/posts/Posts";
import Profile from "ui/profile/Profile";
import { apolloClient } from "lib/utils/apolloClient/apolloClient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Posts />} />
            <Route path="posts" element={<Posts />}></Route>
            <Route path="profile/:id" element={<Profile />}></Route>
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
