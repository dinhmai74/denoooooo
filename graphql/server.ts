import graphql from "https://creatcodebuild.github.io/graphql-projects/deno-graphql-port/dist/graphql.js";
import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";

// Construct a schema, using GraphQL schema language
var schema = graphql.buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!";
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql.graphql(schema, "{ hello }", root).then((response: any) => {
  console.log(response);
});
