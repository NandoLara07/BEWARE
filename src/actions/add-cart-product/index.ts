"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  console.log("📥 addProductToCart chamada com:", data);

  // Validação inicial
  addProductToCartSchema.parse(data);

  // Sessão do usuário
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("👤 Usuário:", session?.user?.id);

  if (!session?.user) {
    throw new Error("Unauthorized - usuário não logado");
  }

  // Produto
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) =>
      eq(productVariant.id, data.productVariantId),
  });
  console.log("📦 Produto encontrado:", productVariant?.id);

  if (!productVariant) {
    throw new Error(
      `Product variant not found - ID recebido: ${data.productVariantId}`,
    );
  }

  // Carrinho
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });
  console.log("🛒 Carrinho encontrado:", cart);

  let cartId = cart?.id;
  if (!cartId) {
    console.log("🛒 Nenhum carrinho encontrado, criando novo...");
    const [newCart] = await db
      .insert(cartTable)
      .values({ userId: session.user.id })
      .returning();
    cartId = newCart.id;
    console.log("🆕 Novo carrinho criado:", cartId);
  }

  // Buscar item existente apenas no carrinho atual
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { and, eq }) =>
      and(
        eq(cartItem.cartId, cartId),
        eq(cartItem.productVariantId, data.productVariantId),
      ),
  });

  console.log("🔎 Item já no carrinho?", !!cartItem);

  if (cartItem) {
    console.log(
      `✏️ Tentando atualizar quantidade: ${cartItem.quantity} + ${data.quantity}`,
    );

    const result = await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity,
      })
      .where(eq(cartItemTable.id, cartItem.id));

    console.log("🔄 UPDATE executado, linhas afetadas:", result.rowCount);

    // Se não atualizou nada, cria o item como novo
    if (!result.rowCount || result.rowCount === 0) {
      console.warn(
        "⚠ Nenhuma linha atualizada — inserindo item novo para evitar item fantasma",
      );
      await db.insert(cartItemTable).values({
        cartId,
        productVariantId: data.productVariantId,
        quantity: data.quantity,
      });
      return { message: "Produto adicionado ao carrinho" };
    }

    return { message: "Quantidade atualizada com sucesso" };
  }

  // Inserir novo item se não existir
  console.log(`➕ Inserindo item novo: ${data.productVariantId}`);
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  });

  return { message: "Produto adicionado com sucesso" };
};
