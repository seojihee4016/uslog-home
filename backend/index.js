const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/test", (req, res) => {
    console.log("백엔드에서 받은 데이터:", req.body);
    res.send({ message: "데이터 잘 받았어요!" });
});

app.listen(PORT, () => {
    console.log(`✅ 백엔드 서버 실행됨 > http://localhost:${PORT}`);
});
