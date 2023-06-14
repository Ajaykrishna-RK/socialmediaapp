import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  admin: null,
  adminToken: null,
  posts: [],
  searchPost: [],
  getUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.searchPost = [];
    },

    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },

    setLogOut: (state) => {
      (state.user = null), (state.token = null);
    },
    setAdminLogin: (state, action) => {
      (state.admin = action.payload.admin),
        (state.adminToken = action.payload.adminToken);
    },
    setAdminLogOut: (state, action) => {
      (state.admin = null), (state.adminToken = null);
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends Not existed");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatePosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatePosts;
    },
    setComments: (state, action) => {
      const commentPosts = state.posts.map((post) => {
   
        if (post._id === action.payload.comments._id) return action.payload.comments;
        return post;
      });
     state.posts = commentPosts
    },
  deleteCommentAction: (state, action) => {


    
  },

    setDeleted: (state, action) => {
      const deletedId = action.payload.deleted._id;
      if (deletedId) {
        const updatePosts = state.posts.filter(
          (post) => post._id !== deletedId
        );

        state.posts = updatePosts;
      }

      return state;
    },
    getUserById: (state, action) => {
      state.getUser = action.payload.getUser;
    },
    setSearched: (state, action) => {
      state.searchPost = action.payload.searchPost;
    },
  },
});

export const {
  setMode,
  setLogOut,
  setFriends,
  setLogin,
  setComments,
  deleteCommentAction,
  setPost,
  setPosts,
  setDeleted,
  setSearched,
  clearState,
  setAdminLogin,
  setAdminLogOut,
} = authSlice.actions;
export default authSlice.reducer;
