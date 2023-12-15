import React, { useState } from "react";

import firebase from "../../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [youName, setYouName] = useState("");
  const [youEmail, setYouEmail] = useState("");
  const [youPass, setYouPass] = useState("");
  const [youPassC, setYouPassC] = useState("");
  const [flag, setFlag] = useState(false);

  let navigate = useNavigate();

  const JoinFunc = async (e) => {
    setFlag(true);

    e.preventDefault();

    // 유효성 검사 안 한 상태
    if (!(youName && youEmail && youPass && youPassC)) {
      return alert("모든 항목을 채워야 회원가입이 가능합니다.");
    }
    if (youPass !== youPassC) {
      return alert("비밀번호가 다르네요!");
    }

    // firebase에 이메일, 비밀번호 넣기
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(youEmail, youPass);

    // 이름도 넣기(createUserWithEmailAndPassword 에는 이메일, 비번밖에 안 됨)
    await createdUser.user.updateProfile({
      displayName: youName,
    });

    console.log(createdUser.user);

    // mongoDB 회원가입
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    // body 주소에 보내기
    axios.post("/api/user/join", body)
    .then((respose) => {
      if (respose.data.success) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        alert("회원가입이 실패하였습니다.");
      }
    });
  };

  return (
    <section className="join_wrap">
      <div className="join_header">
        <h3>Join</h3>
        <p>회원가입 감사합니다!</p>
      </div>
      <div className="join_form">
        <form action="#" name="#" method="post">
          <fieldset>
            <legend className="blind">회원가입 영역</legend>
            <div>
              <label htmlFor="youName" className="required blind">
                name
              </label>
              <input
                type="text"
                id="youName"
                name="youName"
                placeholder="Name"
                className="input_style"
                autoComplete="off"
                required
                value={youName}
                onChange={(e) => setYouName(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="youEmail" className="required blind">
                email
              </label>
              <input
                type="email"
                id="youEmail"
                name="youEmail"
                placeholder="Email"
                className="input_style"
                autoComplete="off"
                required
                value={youEmail}
                onChange={(e) => setYouEmail(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="youPass" className="required blind">
                password
              </label>
              <input
                type="text"
                id="youPass"
                name="youPass"
                placeholder="Password"
                className="input_style"
                autoComplete="off"
                required
                minLength={8}
                value={youPass}
                onChange={(e) => setYouPass(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="youPassC" className="required blind">
                password 확인
              </label>
              <input
                type="text"
                id="youPassC"
                name="youPassC"
                placeholder="Password Check"
                className="input_style"
                autoComplete="off"
                required
                minLength={8}
                value={youPassC}
                onChange={(e) => setYouPassC(e.currentTarget.value)}
              />
            </div>
            <button
              disabled={flag}
              type="submit"
              className="btn_style2 mt100"
              onClick={(e) => JoinFunc(e)}
            >
              Complete
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default Join;
