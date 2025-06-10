import API_URLS, { API_URL } from "@/app/api/api";
import { Profile } from "@/types/profile";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  profile: Profile;
  loading: boolean;
  error: string | null;
}

const defaultProfile: Profile = {
  address: {
    formattedAddress: "",
    zoneId: "",
  },
  email: "",
  firstName: "",
  lastName: "",
  maxJobDistance: 0,
  phoneNumber: "",
  workerId: "",
};

const initialState: ProfileState = {
  profile: defaultProfile,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk<Profile, string>(
  "profile/fetchUserProfile",
  async (workerId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${workerId}/${API_URLS.PROFILE}`);
      if (!res.ok) {
        const errorMessage = `Error: ${res.statusText || "Unknown error"}`;
        return rejectWithValue(errorMessage);
      }
      const result = await res.json();
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Unexpected error");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearJobs(state) {
      state.profile = { ...defaultProfile };
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user profile";
      });
  },
});

export const { clearJobs } = profileSlice.actions;
export default profileSlice.reducer;
