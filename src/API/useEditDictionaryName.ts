import { useMutation } from "@tanstack/react-query";
import { axiosPrivate, getStopWordsDictionaryUrl } from "./constants";

export function useEditDictionaryName() {
  return useMutation({
    mutationKey: ["editDictionaryName"],
    mutationFn: (data: { dictionaryName: string; id: number }) => {
      return axiosPrivate.patch(`${getStopWordsDictionaryUrl}${data.id}/`, {
        dictionaryName: data.dictionaryName,
      });
    },
  });
}
