import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminPage.css";

const AdminPage = () => {
    const { user } = useAuth(); 
    const navigate = useNavigate(); 
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user?.email !== "jiheeseooooo@gmail.com") {
            navigate("/access-denied");
        }

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/users`)
            .then(res => {
                setUsers(res.data); // 관리자면 유저 리스트 불러오기

                console.log("전체 유저 목록:", res.data); // 배열 전체 확인용
                res.data.forEach(u => console.log("유저:", u)); // 개별 확인용
            })
            .catch(err => alert("유저 정보를 불러오지 못했습니다."));
    }, [user, navigate]);
    
return (
        <div className="admin-container">
            <div className="admin-top-txt">관리자 페이지</div>

            <table className="user-table">
                <thead className="user-table__head">
                    <tr className="user-table__head-row">
                        <th className="user-table__head-cell">이메일</th>
                        <th className="user-table__head-cell">카카오 아이디</th>
                        <th className="user-table__head-cell">가입 방식</th>
                        <th className="user-table__head-cell">가입일</th>
                    </tr>
                </thead>
                <tbody className="user-table__body">
                    {users.map((user) => (
                        <tr key={user._id} className="user-table__body-row">
                            <td className="user-table__body-cell">{user.email || '-'}</td>
                            <td className="user-table__body-cell">{user.kakaoId || '-'}</td>
                            <td className="user-table__body-cell">
                                {user.email ? '이메일' : user.kakaoId ? '카카오' : '-'}
                            </td>
                            <td className="user-table__body-cell">
                                {new Date(user.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;