import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeProductFromCart } from "@/actions/remove-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ["remove-cart-product", cartItemId] as const;

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => removeProductFromCart({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      queryClient.refetchQueries({ queryKey: getUseCartQueryKey() }); // ← Força refetch
      toast.success("Produto removido do carrinho");
    },
    onError: () => {
      toast.error("Erro ao remover produto do carrinho");
    },
  });
};
