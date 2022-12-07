import { useState } from "react";

function useFetch(list, url) {
  const [todos, setTodos] = useState(list);

  const addItem = async (newItem) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    } catch (error) {}
    getTodo();
  };

  const getTodo = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const loding = [];
      for (const key in data) {
        loding.push({
          id: key,
          text: data[key].text,
        });
      }
      setTodos(loding);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItemHandler = async (todoId) => {
    try {
      await fetch(
        `https://hw18-d181b-default-rtdb.europe-west1.firebasedatabase.app/todo/${todoId}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
    getTodo();
  };
  return {
    todos,
    addItem,
    getTodo,
    removeItemHandler,
  };
}

export default useFetch;
