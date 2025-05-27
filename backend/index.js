const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // .env 환경변수 불러오기

const User = require("./models/User"); // 사용자 스키마 불러오기

const app = express();
const PORT = 4000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.error("MongoDB 연결 실패:", err));

// POST /test - 카카오 ID 저장 처리
app.post("/test", async (req, res) => {
    console.log("백엔드에서 받은 데이터:", req.body);
    const { kakaoId } = req.body;

    try {
        // 사용자 존재 여부 확인
        let user = await User.findOne({ kakaoId });

        if (!user) {
        // 없으면 새로 저장
        user = new User({ kakaoId, createdAt: new Date() });
        await user.save();
        console.log("새로운 사용자 저장 완료:", user);
        } else {
        console.log("이미 존재하는 사용자:", user);
        }

        res.send({ message: "데이터 저장 완료" });
    } catch (err) {
        console.error("저장 중 오류 발생:", err);
        res.status(500).send({ error: "서버 오류" });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`백엔드 서버 실행됨 > http://localhost:${PORT}`);
});
