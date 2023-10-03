import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoAtom } from "./atoms";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TODO, GET_TODOS } from "./graphql";

const Todolist: React.FC = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useRecoilState(todoAtom);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddTodo = async () => {
    const newTodo = {
      id: Date.now(),
      description: input,
      done: false,
    };

    await updateTodo({
      variables: {
        input: newTodo,
      },
    });

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleUpdateTodo = async (todo) => {
    await updateTodo({
      variables: {
        input: {
          id: todo.id,
          description: todo.description,
          done: todo.done,
        },
      },
    });

    setTodos((prevTodos) =>
      prevTodos.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      })
    );
  };

  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleUpdateTodo(todo)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
            }}
          >
            {todo.description}
            <span className="Edit">✏️</span>
          </li>
        ))}
      </ul>
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
