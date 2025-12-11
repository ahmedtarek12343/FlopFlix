import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { addToHistory } from "../actions/history.action";
import { contentType } from "../actions/favorite.action";

export const useAddHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: contentType) => addToHistory(content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["history"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
