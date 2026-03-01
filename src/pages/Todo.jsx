import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./../components/Wrapper";
import { ArrowDown, Edit, Plus, Save, Trash } from "lucide-react";

const Todo = () => {
  // states
  const [todos, setTodos] = useState(() => {
    try {
      let store = localStorage.getItem("todos");
      return store ? JSON.parse(store) : [];
    } catch (error) {
      console.log(error);
    }
  });

  const [inputTodo, setInputTodo] = useState("");

  const [editTodo, setEditTodo] = useState(null);

  const [showScroll, setShowScroll] = useState(false);

  // ref
  const inputRef = useRef(null);

  const taskItemsRef = useRef({});

  const container = useRef(null);

  // effects

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    if (!editTodo) return;
    const targetEl = taskItemsRef.current[editTodo];
    if (targetEl) targetEl.focus();
  }, [editTodo]);

  // function
  const handleSubmit = () => {
    if (!inputTodo.trim()) return;
    setTodos((prev) => {
      const updated = [
        ...prev,
        {
          id: crypto.randomUUID(),
          todo: inputTodo,
          isComplete: false,
          date: "Created on: " + new Date().toLocaleString(),
        },
      ];
      if (updated.length >= 5) setShowScroll(true);
      return updated;
    });
    setInputTodo("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleDelete = (id) => {
    if (!id) return;
    setTodos((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      if (updated.length < 5) setShowScroll(false);
      return updated;
    });
  };

  const handleEdit = (id, newValue) => {
    if (!id || !newValue) return;
    setTodos((prev) =>
      prev.map((todoItem) =>
        todoItem.id === id
          ? {
              ...todoItem,
              todo: newValue,
              date: "Edited on: " + new Date().toLocaleString(),
            }
          : todoItem,
      ),
    );
  };

  const handleTodoStatus = (id) => {
    if (!id) return;
    setTodos((prev) =>
      prev.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isComplete: !todoItem.isComplete }
          : todoItem,
      ),
    );
    setEditTodo(null);
  };

  const handleEditSave = (todo) => {
    setEditTodo(editTodo === todo.id ? null : todo.id);
  };

  const handleScroll = () => {
    const containerEl = container.current;
    if (!containerEl) return;
    containerEl.scrollTo({
      top: containerEl.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleContainerScroll = () => {
    const containerEl = container.current;
    if (!containerEl) return;

    const nearTop = containerEl.scrollTop < 50;
    const nearBottom =
      containerEl.scrollTop + containerEl.clientHeight >
      containerEl.scrollHeight - 50;
    if (todos.length >= 5) {
      setShowScroll(!nearTop && !nearBottom);
    }
  };
  return (
    <section>
      {/* let todo start */}
      <Wrapper className={"bg-base-300 shadow relative "}>
        <h3 className="text-4xl font-bold font-mono">
          To-<span className="text-indigo-500 ">Do</span>
        </h3>
        <span className="w-15 h-0.5 -rotate-3 rounded-full bg-indigo-500 inline-block absolute left-12"></span>
        {/* input todo */}
        <div className="flex justify-between gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputTodo}
            className="input outline-0 my-5 flex-1"
            placeholder="Enter your task"
            onChange={(e) => setInputTodo(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          {/* add btn */}
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!inputTodo}
          >
            <Plus />
          </button>
        </div>
        <div
          className="space-y-4  max-h-100 overflow-y-scroll scroll-none"
          ref={container}
          onScroll={handleContainerScroll}
        >
          {todos.length === 0 && (
            <p className="text-center text-neutral-700">No Todos yet.</p>
          )}
          {/* card class */}
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className=" bg-base-100 rounded-md p-5 flex items-center justify-between"
              >
                <div className="flex gap-2 items-center flex-1">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleTodoStatus(todo.id)}
                  />

                  <div className="flex flex-col items-start">
                    <input
                      ref={(el) => (taskItemsRef.current[todo.id] = el)}
                      disabled={editTodo !== todo.id}
                      type="text"
                      value={todo.todo}
                      onChange={(e) => handleEdit(todo.id, e.target.value)}
                      className={`px-2  outline-0 border-base-200 truncate ${todo.isComplete ? "line-through border-none" : ""} ${editTodo === todo.id ? "border-b border-primary " : ""}`}
                    />
                    <small
                      className={`px-2 text-xs md:text-sm  ${todo.isComplete ? "text-neutral-600" : "text-neutral-400"}`}
                    >
                      {" "}
                      {todo.date}
                    </small>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-primary p-2 h-fit  "
                    onClick={() => handleEditSave(todo)}
                    disabled={todo.isComplete}
                  >
                    {editTodo === todo.id ? (
                      <Save size={16} />
                    ) : (
                      <Edit size={16} />
                    )}
                  </button>
                  <button
                    className="btn btn-error text-white p-2 h-fit"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            );
          })}

          {showScroll && (
            <button
              className="btn btn-primary btn-soft rounded-full h-12 w-12 p-0 absolute bottom-15  left-1/2 -translate-x-1/2 z-10"
              onClick={handleScroll}
            >
              <ArrowDown />
            </button>
          )}
        </div>

        <p className="text-xs text-center pt-5 text-neutral-700 hover:text-neutral-400 transition-colors duration-150">
          &copy;All rights reserved. Abdur Rahman Adil
        </p>
      </Wrapper>
    </section>
  );
};

export default Todo;
