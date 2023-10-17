import { atom } from "recoil";

interface Todo {
  id: string;
  description: string;
  done: boolean;
}

export const todoState = atom<Todo[]>({
  key: "todoState",
  default: [],
});