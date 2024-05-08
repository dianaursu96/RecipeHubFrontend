import axios from "axios";
import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (request, responseHandlerFunction) => {
    try {
        setIsLoading(true);
        const response = await axios.get(request)
        setIsLoading(false);
        responseHandlerFunction(response);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
