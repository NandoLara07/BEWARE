"use client";

import {
  Home,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";
import CategoryList from "./category-list";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Cart />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="rounded-l-2xl">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    {/* <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        authClient.signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              window.location.href = "/authentication";
                            },
                          },
                        })
                      }
                    >
                      <LogOutIcon />
                    </Button> */}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button asChild size="lg" className="rounded-3xl">
                    <Link href="/authentication">
                      Login
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}

              <div className="py-6">
                <Separator />
              </div>

              <div className="ps-6">
                <div className="flex flex-col gap-4">
                  <Link href="/" className="flex w-fit gap-3">
                    <Home />
                    <p className="font-medium">Início</p>
                  </Link>
                  <Link href="/my-orders" className="flex w-fit gap-3">
                    <Truck />
                    <p className="font-medium">Meus Pedidos</p>
                  </Link>
                  <Cart
                    trigger={
                      <button className="flex cursor-pointer items-center gap-3">
                        <ShoppingCart />
                        <p className="font-medium">Carrinho</p>
                      </button>
                    }
                  />
                </div>
              </div>

              <div className="py-6">
                <Separator />
              </div>

              <div className="ps-6">
                <CategoryList />
              </div>

              {session?.user ? (
                <>
                  <div className="py-6">
                    <Separator />
                  </div>

                  <div className="ps-6">
                    <button
                      onClick={() =>
                        authClient.signOut({
                          fetchOptions: {
                            onSuccess: () => {
                              window.location.href = "/authentication";
                            },
                          },
                        })
                      }
                      className="text-muted-foreground flex items-center gap-2 hover:text-gray-700"
                    >
                      <LogOutIcon size={20} />
                      <p className="font-medium">Sair da conta</p>
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
