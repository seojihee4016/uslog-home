import React, { useState } from "react";
import axios from "axios";
import "../styles/SignupEmailPage.css";

const SignupEmailPage = () => {
    const [email, setEmail] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({
        email: '',
        authCode: '',
        password: '',
        confirmPassword: '',
    });
    const [isVerified, setIsVerified] = useState(false); // 인증 안된 유저 막기

    // 유효성 메시지 함수
    const validate = () => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = '유효한 이메일을 입력해주세요.';
        }
        
        if (!authCode) {
            newErrors.authCode = '인증번호를 입력해주세요.';
        }
        
        if (!password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        } else if (password.length < 8 || password.length > 16) {
            newErrors.password = '비밀번호는 8~16자 사이여야 합니다.';
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }
        
    setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isVerified) {
            setMessage("이메일 인증을 먼저 진행해주세요.");
            return;
        }
        
        if (!validate()) return;
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
                email,
                password,
            });
            
            setMessage(res.data.message);
        } catch (err) {
            const errorMsg = err.response?.data?.message || '회원가입 실패';
            setMessage(errorMsg);
        }
    };

    // 인증번호 전송 요청 함수
    const handleSendCode = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/send-code`, {
                email,
        });
            alert(res.data.message); 
        } catch (err) {
            const errorMsg = err.response?.data?.message || '인증번호 전송 실패';
            alert(errorMsg);
        }
    };

    // 인증번호 확인 함수
    const handleVerifyCode = async () => {
        try {
            // const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify-code`, {
            //     email,
            //     authCode,
            // });
            // setMessage(res.data.message); 
            setMessage("인증되었습니다.");
            setIsVerified(true); // 인증 성공 상태 업데이트

        } catch (err) {
            // const errorMsg = err.response?.data?.message || '인증 실패';
            // setMessage(errorMsg);
            setMessage("이메일 인증을 먼저 진행해주세요."); // 실패 시 false로 안전하게 초기화
            return;
        }
    };

    return (
        <div className="signup-email-container">
            <div className="signup-title">기본정보입력</div>

            <form className="signup-form" onSubmit={handleSignup}>
                <ul className="signup-list">
                    <li className="signup-item">
                        <label className="signup-label" htmlFor="email">이메일</label>
                        <div className="email-area">
                            <input type="email" className={errors.email ? 'error' : ''} id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="이메일" />
                            {errors.email && <p className="error-msg">{errors.email}</p>}
                            <button type="button" className="btn-send-code" onClick={handleSendCode}>인증번호 전송</button>
                        </div>
                    </li>

                    <li className="signup-item">
                        <label className="signup-label" htmlFor="authCode">인증번호</label>
                        <div className="email-area">
                            <input type="text" className={errors.authCode ? 'error' : ''} id="authCode" value={authCode} onChange={(e) => setAuthCode(e.target.value)} required placeholder="인증번호 입력 (유효시간 5분)" />
                            {errors.authCode && <p className="error-msg">{errors.authCode}</p>}
                            <button type="button" className="btn-verify-code" onClick={handleVerifyCode}>인증번호 확인</button>
                        </div>
                    </li>

                    <li className="signup-item">
                        <label className="signup-label" htmlFor="password">비밀번호</label>
                        <input type="password" className={errors.password ? 'error' : ''} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호" />
                        {errors.password && <p className="error-msg">{errors.password}</p>}
                    </li>

                    <li className="signup-item">
                        <label className="signup-label" htmlFor="confirmPassword">비밀번호 확인</label>
                        <input type="password" className={errors.confirmPassword ? 'error' : ''} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="비밀번호 확인" />
                        {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
                    </li>
                </ul>

                <button type="submit" className="btn-submit">가입하기</button>
            </form>

            {message && <p className="signup-message">{message}</p>}
        </div>
    );
};

export default SignupEmailPage;
