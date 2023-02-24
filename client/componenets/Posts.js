import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AuthForm from './AuthForm';
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { setSignup, fetchPostsByUser, selectPosts } from '../reducers';

/**
 * COMPONENT
 */
const Posts = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);

    useEffect(() => {
        async function getPosts() {
            await dispatch(fetchPostsByUser(window.localStorage.getItem("token")));
        }
        getPosts();
        
    },[dispatch])
  
    function handleLogout () {
        window.localStorage.removeItem("token");
        dispatch(setSignup());
        navigate('/');
      }

  return (
    <div>
        <p>You are logged in and can now view all posts</p>
        {posts && posts.length ? (
            posts.map(post => {
                return <div key={post.id}>{post.text}</div>;
            })
        ) : null}
        <button onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}

export default Posts;


