import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "./state/atom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TODOS } from "./graphql/query";
import { UPDATE_TODO } from "./graphql/mutation";

interface Todo {
  id: string;
  description: string;
  done: boolean;
}
interface Todo {
  id: string;
  done: boolean;
}

const Todolist: React.FC = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useRecoilState<Todo[]>(todoState);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const allTodos = [...todos, ...(data?.todos || [])];

  const handleAddTodo = async () => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      description: input,
      done: false,
    };

    await updateTodo({
      variables: {
        input: newTodo,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });

    setTodos([...todos, newTodo]);
    setInput("");
  };

  // const handleUpdateTodo = async (todo: Todo) => {
  //   await updateTodo({
  //     variables: {
  //       input: {
  //         id: todo.id,
  //         description: input,
  //         done: todo.done,
  //       },
  //       refetchQueries: [{ query: GET_TODOS }],
  //     },
  //   });

  //   setTodos((prevTodos) =>
  //     prevTodos.map((t) => {
  //       if (t.id === todo.id) {
  //         return todo;
  //       }
  //       return t;
  //     })
  //   );
  // };
  const handleUpdateTodo = async () => {
    if (editingTodo) {
      await updateTodo({
        variables: {
          input: {
            id: editingTodo.id,
            description: input,
            done: editingTodo.done,
          },
        },
        refetchQueries: [{ query: GET_TODOS }],
      });

      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === editingTodo.id ? { ...t, description: input } : t
        )
      );

      setEditingTodo(null);
      setInput("");
    }
  };

  const handleToggle = (id: string): void => {
    setTodos((todos: Todo[]) =>
      todos.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  };
  return (
    <div className="main-container">
      <h1>Todo List</h1>
      {allTodos.map((todo) => (
        <ul key={todo.id}>
          <li
            onClick={() => handleToggle(todo.id)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
            }}
          >
            {todo.id === editingTodo?.id ? (
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={handleUpdateTodo}
              />
            ) : (
              todo.description
            )}
          </li>
          {todo.id !== editingTodo?.id && (
            <button
              className="Edit"
              onClick={() => {
                setEditingTodo(todo);
                setInput(todo.description);
              }}
            >
              ✏️
            </button>
          )}
        </ul>
      ))}
      <input
        type="text"
        placeholder="Enter your task"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default Todolist;
