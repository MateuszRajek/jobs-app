import API_URLS, { API_URL } from "@/app/api/api";
import {
  AcceptanceJobResponse,
  AcceptJobOfferParams,
  UseAcceptJobOfferResult,
} from "@/types/jobs";
import { useCallback, useState } from "react";

export default function useJobAccept({
  workerId,
  jobId,
}: AcceptJobOfferParams): UseAcceptJobOfferResult {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptJobOffer = useCallback(
    async (actionType: "accept" | "reject") => {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      try {
        const response = await fetch(
          `${API_URL}/${workerId}/${API_URLS.JOB}/${jobId}/${actionType}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error(response.statusText || "Unknown error");
        }
        const result: AcceptanceJobResponse = await response.json();

        if (result.success) {
          setMessage(
            actionType === "accept"
              ? "Offer accepted successfully."
              : "Offer rejected successfully."
          );
        } else {
          setMessage(
            result.message || "Sorry, this role is no longer available."
          );
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    [workerId, jobId]
  );

  return { acceptJobOffer, message, isLoading, error };
}
