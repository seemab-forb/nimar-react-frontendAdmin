import { toast } from "react-toastify";
import { addNewWordsUrl } from "./constants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface addNewWordsType {
  dictionaryId: number;
  words: string[];
}

export const useAddNewWords = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addNewWords"],
    mutationFn: (data: addNewWordsType) => {
      const wordsArray = data.words.map((word) => ({ word }));
      return axiosPrivate.post(addNewWordsUrl + data.dictionaryId + "/", {
        words: wordsArray,
      });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess() {
      toast.success("Added New Words");
      queryClient.invalidateQueries({ queryKey: ["singleDictionary"] });
    },
  });
};
