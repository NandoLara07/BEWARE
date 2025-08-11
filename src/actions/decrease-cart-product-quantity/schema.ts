import { z } from "zod";

export const deacreaseCartProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseCartProductQuantitySchema = z.infer<
  typeof deacreaseCartProductQuantitySchema
>;
