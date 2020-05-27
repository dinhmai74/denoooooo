import { Collection } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

export const DI = {} as {
  users: Collection;
  [rest: string]: Collection;
};
