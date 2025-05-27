import React, { useEffect } from "react";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Header from "./components/Header";
import "./styles/common.css";
import SignupMethodPage from "./pages/SignupMethodPage";
import KakaoCallbackPage from "./pages/KakaoCallbackPage";

// 개발 환경: BrowserRouter, 배포 환경: HashRouter 사용
const Router =
  process.env.NODE_ENV === "development" ? BrowserRouter : HashRouter;

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code =
      url.searchParams.get("code") ||
      new URLSearchParams(window.location.hash.split("?")[1])?.get("code");

    if (code) {
      navigate("/oauth/kakao/callback");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignupMethodPage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    // <Router>
      <RedirectHandler />
    // </Router>
  );
}

export default App;