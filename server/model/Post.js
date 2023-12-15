const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum: Number,
    image: String,
    // 조인 형식으로 다른 스키마의 정보 가져오기 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { collection: "posts" });

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };