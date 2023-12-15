import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PostModify = () => {
  // 수정 정보 저장
  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((respose) => {
        if (respose.data.success) {
          setPostInfo(respose.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postNum]);

  useEffect(() => {
    // 수정된 정보를 타이틀과 내용에 저장
    setTitle(postInfo.title);
    setContent(postInfo.content);
  }, [postInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return alert("모든 항목을 채워주세요.");
    }

    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
    };

    axios
      .post("/api/post/modify", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate("/list");
        } else {
          alert("글 수정이 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="write_wrap">
      <div className="write_header">
        <h3>Modify</h3>
        <p>글을 수정하시겠습니까?</p>
      </div>
      <form className="write_form">
        <fieldset>
          <legend className="blind">글 쓰기 영역</legend>
          <div>
            <label htmlFor="youName" className="required blind">
              글 제목
            </label>
            <input
              type="text"
              id="youName"
              placeholder="글을 작성하세요!"
              value={title || ""}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="youName" className="required blind">
              글 내용
            </label>
            <textarea
              type="text"
              id="youName"
              placeholder="글 내용을 작성하세요!"
              value={content || ""}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
          </div>

          <button
            type="submit"
            className="btn_style2 mt30"
            onClick={(e) => onSubmit(e)}
          >
            수정하기
          </button>
          <button
            type="submit"
            className="btn_style2 mt30"
            onClick={(e) => onSubmit(e)}
          >
            취소하기
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default PostModify;
