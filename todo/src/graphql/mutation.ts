import { gql } from '@apollo/client';
export const UPDATE_TODO=gql`
mutation updateTodo($input: UpdateTodoInput) {
  updateTodo(input: $input) {
    id
   description
   done
  }
}

`