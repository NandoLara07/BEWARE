"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { SkeletonCard } from "../ui/skeleton-card";
import CartItem from "./cart-item";

interface CartProps {
  trigger?: ReactNode;
}

export const Cart = ({ trigger }: CartProps) => {
  const { data: cart, isPending: cartIsLoading } = useCart();

  const defaultTrigger = (
    <Button variant="outline" size="icon">
      <ShoppingCart />
    </Button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger || defaultTrigger}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        {/* Área scrollável - flex-1 toma o espaço restante */}
        <div className="flex-1 overflow-hidden px-5">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-4 pb-4">
              {cartIsLoading && (
                <div className="flex flex-col gap-4">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              )}
              {!cartIsLoading && (!cart?.items || cart.items.length === 0) && (
                <div className="flex h-full flex-col items-center justify-center py-8">
                  <p className="text-center text-gray-500">
                    Não há nenhum produto no carrinho :/
                  </p>
                </div>
              )}
              {cart?.items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  productVariantId={item.productVariant.id}
                  productName={item.productVariant.product.name}
                  productVariantName={item.productVariant.name}
                  productVariantImageUrl={item.productVariant.imageUrl}
                  productVariantPriceInCents={item.productVariant.priceInCents}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Resumo fixo - flex-shrink-0 impede que seja comprimido */}
        {cart?.items && cart?.items.length > 0 && (
          <div className="bg-background flex-shrink-0 border-t px-5 pt-4 pb-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega</p>
                <p className="text-green-600">GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Button className="mt-3 w-full rounded-full" asChild>
                <Link href="/cart/identification">Finalizar compra</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

// SERVER ACTION
