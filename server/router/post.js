const express = require("express");
// 따로 빼려면 로우터 필요
const router = express.Router();
const multer = require("multer");

// 스키마 만들기
const { Post } = require("../model/Post.js");
const { Counter } = require("../model/Counter.js");

const setUpload = require("../util/upload.js")



// 글 쓰기
router.post("/write", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogWrite = new Post(temp); // Post 스키마에 글 작성하기
            BlogWrite
                .save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
                        res.status(200).json({ success: true });
                    })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// 글 목록 api
router.post("/list", (req, res) => {
    // sql의 select와 비슷
    Post
        .find()
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, postList: result })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})

// 글 상세페이지
router.post("/detail", (req, res) => {
    // 하나 찾기(findOne)
    Post
        .findOne({ postNum: req.body.postNum })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({ success: true, post: result })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// 글 수정하기
router.post("/modify", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }
    // 하나만 수정
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp }) // 수정할 때는 set 필요
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// 글 삭제하기
router.post("/delete", (req, res) => {
    // 하나만 삭제
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

// // 이미지 업로드(로컬용)
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "image/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//     console.log(req.body, req.formData); 
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).json({ success: false });
//         } else {
//             res.status(200).json({ success: true, filePath: res.req.file.path })
//         }
//     })
// })


// 이미지 업로드(네이버 클라우드용)
router.post("/image/upload", setUpload("react-blog941110/post"), (req, res, next) => {
    // console.log(res.req);
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

module.exports = router;
