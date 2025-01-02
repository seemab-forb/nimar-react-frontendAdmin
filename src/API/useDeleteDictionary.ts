import { useMutation } from "@tanstack/react-query";
import { axiosPrivate, getStopWordsDictionaryUrl } from "./constants";

export function useDeleteDictionary() {
  return useMutation({
    mutationKey: ["deleteDictionary"],
    mutationFn: (dictionaryId: number) => {
      return axiosPrivate.delete(`${getStopWordsDictionaryUrl}${dictionaryId}`);
    },
  });
}
