import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import { DI } from "../model/model.ts";

export const userResolvers = {
  Query: {
    getUser: async (parent: any, { id }: any, context: any, info: any) => {
      const user = await DI.users.findOne({ _id: ObjectId(id) });
      console.log("user", user);
      return {
        user,
      };
    },
  },
  Mutation: {
    signUp: async (parent: any, { input }: any, context: any, info: any) => {
      const { email, password, name } = input;
      const id = await DI.users.insertOne({
        email,
        password,
        name,
      });

      console.log("id", input);
      console.log("email", email);
      return {
        user: {
          email,
          password,
          name,
        },
      };
    },
  },
};
