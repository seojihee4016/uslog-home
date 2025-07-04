import React from "react";

import { MdEmail } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
// import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

import "../../styles/SignupMethodPage.css";

const SignupMethodPage = () => {
    const navigate = useNavigate(); 

    const handleEmailSignup = () => {
        navigate("/signup/email"); // SPA 방식 라우팅, 화면 전환만 발생하도록
        alert("이메일 회원가입 페이지로 이동합니다");
    };

    const handleKakaoLogin = () => {
        const REST_API_KEY = "65295b9472b38097d11e3a81dd2b5983";
        // 배포용
        // const REDIRECT_URI = "https://seojihee4016.github.io/uslog-home";
        // 테스트용
        // const REDIRECT_URI = "http://localhost:3000/#/oauth/kakao/callback";

        const REDIRECT_URI =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000/oauth/kakao/callback"
            : "https://uslog-home.netlify.app/oauth/kakao/callback";
            // : "https://seojihee4016.github.io/uslog-home";
    
        // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}/oauth/kakao/callback&response_type=code`;
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    
        window.location.href = KAKAO_AUTH_URL;
    };    

    // const handleNaverSignup = () => {
    //     alert("네이버 로그인 연동");
    // };

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
                        <MdEmail /> 이메일로 회원가입
                    </div>

                    <div className="btn kakao" onClick={handleKakaoLogin}>
                        <RiKakaoTalkFill /> 카카오로 회원가입
                    </div>
                    {/* <div className="btn naver" onClick={handleNaverSignup}>
                        <FaLeaf /> 네이버로 회원가입
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default SignupMethodPage;
