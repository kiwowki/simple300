import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux' // 가져올 때는 useSelector 보낼 때는 useDispatch
// import { useSelector, useDispatch } from 'react-redux' app.js에서는 테스트 용
import { loginUser, clearUser } from './reducer/userSlice'
import firebase from './firebase.js'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Main from './components/layout/Main'

import Home from './pages/Home'
import PostList from './components/post/PostList'
import PostWrite from './components/post/PostWrite'
import PostDetail from './components/post/PostDetail'
import PostModify from './components/post/PostModify'
import Login from './components/user/Login'
import Join from './components/user/Join'

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user); 테스트 용

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo : ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    })
  }, [dispatch]);

  // 로그인 테스트
  // useEffect(() => {
  //   console.log("user", user);
  // }, [user])

  // 로그아웃 테스트(버튼 누르면 로그아웃 되게. null이 나와야 함)
  // useEffect(() => {
  //  firebase.auth().signOut();
  // }, []);


  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/list' element={<PostList />}></Route>
          <Route path='/write' element={<PostWrite />}></Route>
          <Route path='/detail/:postNum' element={<PostDetail />}></Route>
          <Route path='/modify/:postNum' element={<PostModify />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App