import React, { useEffect } from "react";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import "./styles/common.css";
import SignupMethodPage from "./pages/auth/SignupMethodPage";
import KakaoCallbackPage from "./pages/auth/KakaoCallbackPage";
import SignupEmailPage from "./pages/auth/SignupEmailPage";
import LoginMethodPage from "./pages/auth/LoginMethodPage";
import LoginEmailPage from "./pages/auth/LoginEmailPage";
import AdminPage from "./pages/auth/AdminPage";
import AccessDenied from "./pages/Error/AccessDenied";

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
        <Route path="/signup/email" element={<SignupEmailPage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
        <Route path="/login" element={<LoginMethodPage />} />
        <Route path="/login/email" element={<LoginEmailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <RedirectHandler />
      </Router>
    </AuthProvider>
  );
}

export default App;