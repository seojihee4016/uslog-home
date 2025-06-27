import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user } = useAuth();

    return (
    <header className="header">
        <div className="header-inner">
            <div className="header-left">
                <Link to="/" className="header-left">USLOG</Link>
            </div>

            <div className="header-right">
                <li>
                    <Link to="/">회원가입</Link> 
                </li>
                <li>
                    <Link to="/login">로그인</Link> 
                </li>

                 {/* 관리자 계정인 경우에만 표시 */}
                {user?.email === "jiheeseooooo@gmail.com" && (
                    <li><Link to="/admin">관리자</Link></li>
                )}
            </div>
        </div>
    </header>
    );
};

export default Header;
