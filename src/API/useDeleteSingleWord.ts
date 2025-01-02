import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { deleteSingleWordUrl } from "./constants";
import { toast } from "react-toastify";

export const useDeleteSingleWord = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSingleWord"],
    mutationFn: ({
      dictionaryId,
      wordId,
    }: {
      dictionaryId: number;
      wordId: number;
    }) => {
      return axiosPrivate.delete(
        `${deleteSingleWordUrl}${dictionaryId}/word/${wordId}`
      );
    },
    onSuccess: () => {
      toast.success("Word deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["stopWordsDictionary"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
};
