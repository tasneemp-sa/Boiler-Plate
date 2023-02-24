import React from 'react';
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const TOKEN = "token"

export const authenticate = createAsyncThunk(
  "auth/post",
  async ({username, password, method}) => {
    console.log('method', method);
    const {data} = await axios.post(`/api/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, data.token);
    return data;
  }
);

export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchAll",
  async (token) => {
    const {data} = await axios.get(`/api/auth/posts`, {
      headers: {
        authorization: token
      }
    })
    console.log('posts', data);
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {},
    login: "",
    signup: "Sign Up",
    logout: "",
    posts: []
  },
  reducers: {
    setLogin (state) {
      state.signup = "";
      state.login = "Login";
    },
    setSignup (state) {
      state.login = "";
      state.signup = "Sign Up";
    },
    setLogout (state) {
      state.login = "";
      state.logout = "Log Out";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
  },
});

export const { setLogin, setSignup, setLogout } =
  authSlice.actions;

export const getLogin = (state) => {
  return state.auth.login;
};

export const getLogout = (state) => {
  return state.auth.logout;
};

export const getSignup = (state) => {
  console.log('state',state);
  return state.auth.signup;
};

export const selectPosts = (state) => {
  return state.auth.posts;
};

export default authSlice.reducer;
