import { AppDispatch, RootState } from "@/app/store";
import { fetchUserProfile } from "@/app/store/slices/profileSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProfile = (workerId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    if (workerId) dispatch(fetchUserProfile(workerId));
  }, [dispatch, workerId]);

  return { profile, loading, error };
};
