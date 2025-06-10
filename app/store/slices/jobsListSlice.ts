import API_URLS, { API_URL } from "@/app/api/api";
import { Jobs } from "@/types/jobs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface JobsState {
  jobs: Jobs;
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
};

export const fetchMatchedJobs = createAsyncThunk<Jobs, string>(
  "jobs/fetchMatchedJobs",
  async (workerId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${workerId}/${API_URLS.MATCHES}`);
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

const jobsListSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearJobs(state) {
      state.jobs = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchedJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchMatchedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
      });
  },
});

export const { clearJobs } = jobsListSlice.actions;
export default jobsListSlice.reducer;
