import React, { useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import "./styles/common.css";
import SignupMethodPage from "./pages/SignupMethodPage";
import KakaoCallbackPage from "./pages/KakaoCallbackPage";

// 코드가 있는 경우 자동으로 콜백 페이지로 라우팅 처리하는 Wrapper
const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
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
    <HashRouter>
      <RedirectHandler />
    </HashRouter>
  );
}

export default App;
