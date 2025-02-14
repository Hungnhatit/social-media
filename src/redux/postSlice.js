import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  activePostId: null,
  editPost: false
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload
    },

    updatePost(state, action) {
      state.editPost = action.payload;
    },

  }
});

export default postSlice.reducer;

export function SetPosts(post) {
  return (dispatch, getState) => {
    dispatch(postSlice.actions.getPosts(post));
  }
}

export function EditPost(post) {
  return (dispatch, getState) => {
    dispatch(postSlice.actions.updatePost(post));
  }
}
