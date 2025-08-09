"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

import getCart from "@/actions/get-cart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCentsToBRL } from "@/helpers/money";

import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col rounded-l-2xl">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col px-5 pb-5">
          <div className="mb-4 min-h-0 flex-1">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-4 py-2">
                {cartIsLoading && <div>Carregando...</div>}
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-shrink-0 flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-xs">
                <p>Subtotal</p>
                <p className="font-semibold">
                  {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <p>Entrega</p>
                <p className="font-semibold">GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <p>Total</p>
                <p className="font-semibold">
                  {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                </p>
              </div>

              <Button className="mt-4 rounded-full">Finalizar Compra</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
