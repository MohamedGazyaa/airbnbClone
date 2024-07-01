import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("/login", user);
    const token = response.data.token;
    thunkAPI.dispatch(getProfileData(token));

    return token;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const getProfileData = createAsyncThunk(
  "user/profileData",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("currentUser")) || null,
    token: JSON.parse(sessionStorage.getItem("token")) || null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      sessionStorage.removeItem("currentUser");
      state.token = null;
      sessionStorage.removeItem("token");
      state.status = "idle";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.token = action.payload;
        const saveState = JSON.stringify(action.payload);
        sessionStorage.setItem("token", saveState);
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload.error;
      })
      // Handle getProfileData
      .addCase(getProfileData.pending, (state) => {
        state.loading = true;
        state.status = "pending";
        state.error = null;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload;
        const saveState = JSON.stringify(action.payload);
        sessionStorage.setItem("currentUser", saveState);
        state.error = null;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});
export const { logout } = currentUserSlice.actions;
export default currentUserSlice.reducer;
