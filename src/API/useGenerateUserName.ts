import axios from "axios";
import { generateUsernameUrl } from "./constants";
import { useState } from "react";

export const useGenerateUserName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function generateUserName({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) {
    setIsLoading(true);
    setErrorMessage("");
    setIsError(false);
    try {
      const response = await axios.post(generateUsernameUrl, {
        first_name: firstName,
        last_name: lastName,
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error?.message);
      }
      setIsLoading(false);
      throw error;
    }
  }

  return {
    generateUserName,
    isLoading,
    isError,
    errorMessage,
  };
};
