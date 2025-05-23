import React from "react";

import { MdEmail } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaLeaf } from "react-icons/fa";

import "../styles/SignupMethodPage.css";

const SignupMethodPage = () => {
    const handleEmailSignup = () => {
        alert("이메일 회원가입 페이지로 이동합니다");
    };

    const handleKakaoSignup = () => {
        alert("카카오 로그인 연동");
    };

    const handleNaverSignup = () => {
        alert("네이버 로그인 연동");
    };

    return (
        <>
            <div className="signup-method">
                <div className="welcome-box">
                    <div className="welcome-icon img-area"></div>
                    <div className="welcome-txt">
                        USLOG에 오신 걸 환영합니다 
                        <span className="bang">!</span>
                    </div>
                </div>

                <div className="select-method-txt">USLOG 회원가입 방식을 선택해주세요.</div>

                <div className="signup-buttons">
                    <div className="btn email" onClick={handleEmailSignup}>
                        <MdEmail /> USLOG로 회원가입
                    </div>
                    <div className="btn kakao" onClick={handleKakaoSignup}>
                        <RiKakaoTalkFill /> 카카오로 회원가입
                    </div>
                    <div className="btn naver" onClick={handleNaverSignup}>
                        <FaLeaf /> 네이버로 회원가입
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupMethodPage;
