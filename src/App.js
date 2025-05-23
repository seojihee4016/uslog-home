import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import "./styles/common.css";
import SignupMethodPage from "./pages/SignupMethodPage";
import KakaoCallbackPage from "./pages/KakaoCallbackPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SignupMethodPage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallbackPage />} />
      </Routes>
    </>
  );
}

export default App;