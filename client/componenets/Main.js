import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AuthForm from './AuthForm';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Posts from './Posts';

/**
 * COMPONENT
 */
const Main = props => {
  
  return (
    <div>
        <Routes>
       <Route path="/" element={<AuthForm />}></Route>
       <Route path="/posts" element={<Posts />}></Route>
       </Routes>
    </div>
  )
}

export default Main;


