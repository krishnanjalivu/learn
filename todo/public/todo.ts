// import React, { useState } from "react";

// interface item {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// const Todolist: React.FC = () => {
//   // const [todos, setTodos] = useState<item[]>([
//   //   { id: 1, text: "Learn TYpescript", completed: false },
//   //   { id: 2, text: "Learn Javascript", completed: false },
//   //   { id: 3, text: "Learn react", completed: false },
//   // ]);
//   const [todos, setTodos] = useState<item[]>([
//     { id: 1, text: "Learn TYpescript", completed: false },
//     { id: 2, text: "Learn Javascript", completed: false },
//     { id: 3, text: "Learn react", completed: false },
//   ]);

   
//   const [input, setInput] = useState<string>("");
//   const handleToggle = (id: number) => {
//     setTodos(
//       todos.map((todo) => {
//         if (todo.id === id) {
//           return { ...todo, completed: !todo.completed };
//         }
//         return todo;
//       })
//     );
//   };
//   const handleClick = () => {
//     const newTodo: item = { id: Date.now(), text: input, completed: false };
//     setTodos([...todos, newTodo]);
//   };
//   return (
//     <div className="main-container">
//       <h1>Todo List</h1>
//       <ul>
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             onClick={() => handleToggle(todo.id)}
//             style={{ textDecoration: todo.completed ? "line-through" : "none" }}
//           >
//             {todo.text}
//             <span className="Edit">✏️</span>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         placeholder="Enter your task"
//         onChange={(e) => {
//           setInput(e.currentTarget.value);
//         }}
//       ></input>
//       <button onClick={handleClick}>Add</button>
//     </div>
//   );
// };

// export default Todolist;