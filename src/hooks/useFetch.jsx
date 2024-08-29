import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true); // Set loading to true when starting the fetch

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      if (!supabaseAccessToken) {
        throw new Error("Failed to retrieve Supabase access token.");
      }

      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (err) {
      // Ensure error is a proper object
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  };

  return { fn, data, loading, error };
};

export default useFetch;
