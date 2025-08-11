import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();

  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-cart-product", id],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] }); // ← Força refetch
      toast.success("Produto removido do carrinho");
    },
    onError: () => {
      toast.error("Erro ao remover produto do carrinho");
    },
  });
  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ["decrease-cart-product-quantity", id],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
      toast.success("Quantidade diminuída");
    },
    onError: () => {
      toast.error("Erro ao diminuir quantidade");
    },
  });
  const increaseCartProductQuantityMutation = useMutation({
    mutationKey: ["increase-cart-product-quantity", productVariantId],
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.refetchQueries({ queryKey: ["cart"] });
      toast.success("Quantidade aumentada");
    },
    onError: () => {
      toast.error("Erro ao aumentar quantidade");
    },
  });
  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate();
  };
  const handleDecreaseQuantityClick = () => {
    if (quantity <= 1) {
      removeProductFromCartMutation.mutate(); // Remove se quantidade = 1
    } else {
      decreaseCartProductQuantityMutation.mutate();
    }
  };
  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate();
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
          loading="lazy"
          quality={60}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzgiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCA3OCA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzgiIGhlaWdodD0iNzgiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4="
          sizes="78px"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>

          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
              disabled={
                decreaseCartProductQuantityMutation.isPending ||
                removeProductFromCartMutation.isPending
              }
            >
              <MinusIcon size={12} />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleIncreaseQuantityClick}
              disabled={increaseCartProductQuantityMutation.isPending}
            >
              <PlusIcon size={12} />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-red-500 hover:text-white"
          onClick={handleDeleteClick}
          disabled={removeProductFromCartMutation.isPending}
        >
          <TrashIcon size={16} />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
