import { gql } from "apollo-server-express"
export const typeDefs=gql`
scalar Date
type Todo{
id:ID
title:String!
detail:String
date:Date
}
type Query {
  Welcome:String
  getTodos:[Todo]
  getTodo(id:ID):Todo
}
type Mutation{
    addTodo(title:String,detail:String,date:Date):Todo
    deleteTodo(id:ID):String
    updateTodo(id:ID,title:String,detail:String,date:Date):Todo
}
`