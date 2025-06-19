import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
    <header className="header">
        <div className="header-inner">
            <div className="header-left">USLOG</div>
            <div className="header-right">
                <li>
                    <Link to="/">회원가입</Link> 
                </li>
                <li>
                    <Link to="/login">로그인</Link> 
                </li>
            </div>
        </div>
    </header>
    );
};

export default Header;
