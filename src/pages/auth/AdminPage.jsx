import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/AdminPage.css";

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/users`)
        .then(res => setUsers(res.data))
        .catch(err => alert("유저 정보를 불러오지 못했습니다."));
    }, []);

return (
        <div className="admin-container">
            <div className="admin-top-txt">관리자 페이지</div>

            <table className="user-table">
                <thead className="user-table__head">
                    <tr className="user-table__head-row">
                        <th className="user-table__head-cell">이메일</th>
                        <th className="user-table__head-cell">카카오 아이디</th>
                        <th className="user-table__head-cell">가입일</th>
                    </tr>
                </thead>
                <tbody className="user-table__body">
                    {users.map((user) => (
                        <tr key={user._id} className="user-table__body-row">
                            <td className="user-table__body-cell">{user.email}</td>
                            <td className="user-table__body-cell">{user.kakaoId || '-'}</td>
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