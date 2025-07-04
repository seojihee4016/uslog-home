import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/LoginEmailPage.css";

const LoginEmailPage = () => {
    const { setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                email,
                password,
            });

            const userData = res.data;
            setUser({ email: userData.email }); // 관리자 로그인 정보 저장
            navigate("/");
            alert("로그인 성공");
            console.log("로그인 응답:", res.data);
            navigate("/");
        } catch (err) {
            const errorMsg = err.response?.data?.message || "로그인 실패";
            alert(errorMsg);
        }
    };

    return (
        <div className="login-container">
            <div className="select-method-txt">이메일 로그인</div>

            <form className="email-login-form"  onSubmit={handleEmailLogin}>
                <ul className="signup-list">
                    <li className="signup-item">
                        <input type="email" placeholder="이메일(@gmail.com)" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </li>

                    <li className="signup-item">
                        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </li>
                </ul>

                <button className="email-login-button" type="submit">로그인</button>
            </form>
        </div>
    );
};

export default LoginEmailPage;