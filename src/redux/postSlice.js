import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
      const response = await axios.get('https://dummyjson.com/posts?limit=10');
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  });

const postSlice=createSlice({
    name:'post',
    initialState:{posts:[],value:[],loading:false},
    reducers:{
        add:(state,action)=>{
            state.value.posts = [...state.value.posts, action.payload];
        },
        remove:(state,action)=>{
          state.value.posts = state.value.posts.filter((post) => post.id !== action.payload.id);
        },
        editTitle: (state, action) => {
          state.value.posts.map((user) => {
            if (user.id === action.payload.id) {
              user.title=action.payload.title
            }
          });
        },
        editBody: (state, action) => {
          state.value.posts.map((user) => {
            if (user.id === action.payload.id) {
              user.body=action.payload.body
            }
          });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
          state.value = action.payload;
          state.loading = false;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
          state.loading = false;
        });
      },
    
})

export const { add, remove,editTitle,editBody } = postSlice.actions;
export default postSlice.reducer