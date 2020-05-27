import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

// @ts-ignore
export const types = gql`
  type User {
    email: String!
    name: String
    password: String
  }

  input UserInput {
    email: String
    name: String
    password: String
  }

  type ResolveType {
    done: Boolean
  }

  type FieldError {
    message: String!
  }

  type UserResponse {
    error: FieldError
    user: User
  }

  type Query {
    getUser(id: String): UserResponse
    hello: String
  }

  type Mutation {
    setUser(input: UserInput!): ResolveType!
    signUp(input: UserInput!): ResolveType!
  }
`;
