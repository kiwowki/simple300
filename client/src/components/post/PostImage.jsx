// 이미지 불러오기 작업
import axios from "axios";
import React from "react";

const PostImage = (props) => {
  const FileUpload = (e) => {
    // console.log(e.target.files);
    const formData = new FormData(); // FormData() -> 자바스크립트 매서드임
    formData.append("file", e.target.files[0]);
    // for (const keyValue of formData) console.log(keyValue)

    axios.post("/api/post/image/upload", formData).then((response) => {
      console.log(response);
      props.setImage(response.data.filePath);
    });
  };
  return (
    <div style={{ padding: "20px" }}>
      {/* <img src={`http://localhost:5050/${Image}`} alt="d" style={{ width: "100%" }} /> */}
      <input type="file" accept="image/*" onChange={(e) => FileUpload(e)} />
    </div>
  );
};

export default PostImage;
