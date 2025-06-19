const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");

// 회원가입 API
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 중복 체크
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "이미 존재하는 이메일입니다." }
        );
    }

    // 유저 저장
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, createdAt: new Date() });
    await newUser.save();

    res.status(201).json({ message: "회원가입 성공" });
    
    } catch (error) {
        console.error("회원가입 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

router.post('/send-code', async (req, res) => {
    const { email } = req.body;
    const code = String(Math.floor(100000 + Math.random() * 900000)); // 6자리 인증코드

    // 세션/DB에 저장해도 되지만, 지금은 간단히 메모리 저장
    global.emailCodes = global.emailCodes || {};
    global.emailCodes[email] = code;

    // nodemailer를 통한 메일 전송 설정
    try {
    const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    console.log("메일 전송 시도 중...");

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "[uslog] 이메일 인증번호입니다",
        text: `인증번호는 ${code} 입니다. 5분 내에 입력해 주세요.`,
    });

    console.log('USER:', process.env.EMAIL_USER);
    console.log('PASS:', process.env.EMAIL_PASS);
    console.log("메일 전송 성공");

    res.json({ message: "인증번호를 전송했습니다." });
    } catch (err) {
        console.error("메일 전송 실패:", err);
        res.status(500).json({ message: "메일 전송 실패", error: err });
    }
});

router.post('/verify-code', (req, res) => {
    const { email, authCode } = req.body;

    const savedCode = global.emailCodes?.[email];

    if (!savedCode) {
        return res.status(400).json({ message: '인증번호가 존재하지 않습니다.' });
    }

    if (savedCode !== authCode) {
        return res.status(401).json({ message: '인증번호가 일치하지 않습니다.' });
    }

    // 인증 성공 시 해당 코드 삭제해야 됨
    delete global.emailCodes[email];

    res.json({ message: '인증에 성공했습니다.' });
});

// 비밀번호 비교
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ message: "존재하지 않는 사용자입니다." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        res.json({ message: "로그인 성공", user }); // 이후 JWT 발급해야 함
    } catch (err) {
        console.error("로그인 에러:", err);
        res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
