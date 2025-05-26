import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; 

import Header from "./components/Header";
import "./styles/common.css";
import SignupMethodPage from "./pages/SignupMethodPage";
import KakaoCallbackPage from "./pages/KakaoCallbackPage";

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
  return <RedirectHandler />;
}

export default App;
