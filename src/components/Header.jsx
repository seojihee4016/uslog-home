import React from "react";
import "./Header.css";

const Header = () => {
    return (
    <header className="header">
        <div className="header-inner">
            <div className="header-left">USLOG</div>
            {/* <div className="header-right">
                <li>
                    <a href="#">회원가입</a>
                </li>
                <li>
                    <a href="#">로그인</a> 
                </li>
            </div> */}
        </div>
    </header>
    );
};

export default Header;
