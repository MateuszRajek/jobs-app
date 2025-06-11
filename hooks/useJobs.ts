import { AppDispatch, RootState } from "@/app/store";
import { fetchMatchedJobs } from "@/app/store/slices/jobsListSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useJobs = (workerId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    if (workerId) dispatch(fetchMatchedJobs(workerId));
  }, [dispatch, workerId]);

  return { jobs, loading, error };
};
