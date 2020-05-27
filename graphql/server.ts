import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts";
import { types } from "./graphql-types/QueryAndMutation.types.ts";
import { DI } from "./model/model.ts";
import { userResolvers } from "./resolvers/User.resolvers.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("bowie-deno");
const users = db.collection("users");
DI.users = users;

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

const GraphQLService = applyGraphQL({
  typeDefs: types,
  resolvers: [userResolvers],
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080/graphql");
await app.listen({ port: 8080 });
