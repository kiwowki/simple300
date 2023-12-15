const express = require("express");
// 따로 빼려면 로우터 필요
const router = express.Router();

// 스키마 만들기
const { User } = require("../model/User.js");
const { Counter } = require("../model/Counter.js");

// join 정보 받기
router.post("/join", (req, res) => {
    let temp = req.body;

    // 몽고DB에서 Counter DB 찾기
    Counter.findOne({ name: "counter" })
        .then((result) => {
            // temp의 userNum을 결과에 넣기
            temp.userNum = result.userNum;

            // 다음 counter는 2번으로 만들어주기(1씩 증가)
            const userData = new User(temp);
            userData.save().then(() => {
                Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(() => {
                    res.status(200).json({ success: true })
                })
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: true });
        })
})

module.exports = router;