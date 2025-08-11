"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado ao carrinho");
    },
    onError: (error) => {
      if (error.message === "Unauthorized") {
        toast.error(
          "Você precisa estar logado para adicionar produtos ao carrinho!",
        );
      } else {
        toast.error("Erro ao adicionar produto ao carrinho");
      }
    },
  });

  const handleAddToCart = () => {
    // ✅ VERIFICAÇÃO ANTES DE ADICIONAR
    if (!session?.user) {
      toast.error(
        "Você precisa estar logado para adicionar produtos ao carrinho!",
      );
      return;
    }

    mutate();
  };

  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
