import React from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../styles/LoginMethodPage.css";

const LoginMethodPage = () => {
    return (
        <div className="login-container">
            <div className="login-method">
                <div className="select-method-txt">
                    USLOG 로그인 방식을 선택해주세요.
                </div>

                <div className="login-buttons">
                    <Link to="/login/email" className="btn email">
                        <MdEmail /> 이메일로 로그인
                    </Link>
                    <div className="btn kakao">
                        <RiKakaoTalkFill /> 카카오로 로그인
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginMethodPage;
