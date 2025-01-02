import { toast } from "react-toastify";
import { createWordsDictionaryUrl } from "./constants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export interface CreateDictionaryType {
  dictionaryName: string;
  words: string[]; // Array of strings
}

export const useCreateWordsDictionary = () => {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationKey: ["createWordsDictionary"],
    mutationFn: (data: CreateDictionaryType) => {
      const wordsArray = data.words.map((word) => ({ word }));

      return axiosPrivate.post(createWordsDictionaryUrl, {
        dictionaryName: data.dictionaryName,
        words: wordsArray,
      });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess() {
      toast.success("Dictionary created successfully");
    },
  });
};
