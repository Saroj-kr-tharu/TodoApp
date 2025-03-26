import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodosAction } from "../../redux/slice/todoapiSlice";
import toast from "react-hot-toast";

function AddMenuBtn({ setIsNewTaskOpen }) {
  const dispatch = useDispatch();
  const currUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const email = currUser?.email || toast.error('login');

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 12);
  const defaultDueDate = currentDate.toISOString().slice(0, 16);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    complete: false,
    dueDate: defaultDueDate,
    completedAt: null,
  });

  const resetForm = () => {
    setNewTask({
      title: "",
      description: "",
      priority: "low",
      status: "pending",
      complete: false,
      dueDate: defaultDueDate,
      completedAt: null,
    });
    setIsNewTaskOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      toast("Title or description is empty");
      return;
    }
    const taskData = { ...newTask, email };
    dispatch(addTodosAction(taskData));
    resetForm();
  };

  const handleDueDateChange = (e) => {
    const value = e.target.value;
    if (value === "1day" || value === "2day") {
      const daysToAdd = value === "1day" ? 1 : 2;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysToAdd);
      setNewTask({ ...newTask, dueDate: dueDate.toISOString().split("T")[0] });
    } else {
      setNewTask({ ...newTask, dueDate: value });
    }
  };

  const renderPriorityButton = (priority) => {
    const priorityColors = {
      low: "green",
      meduim: "yellow",
      high: "red",
    };

    return (
      <button
        type="button"
        key={priority}
        className={`px-2 py-1 rounded text-xs md:text-sm md:px-3 md:py-2 font-medium transition ${
          newTask.priority === priority
            ? `bg-${priorityColors[priority]}-100 text-${priorityColors[priority]}-800 border border-${priorityColors[priority]}-800 hover:bg-${priorityColors[priority]}-200`
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        onClick={() => setNewTask({ ...newTask, priority })}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </button>
    );
  };

  return (
    <div className="bg-slate-500 rounded-lg shadow p-3 md:p-4 lg:p-6 mb-4 border-l border-r border-b border-t-2 border-indigo-600 mx-2 md:mx-4 max-w-2xl">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3 text-indigo-800">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Add details"
          rows={3}
          className="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <div className="flex gap-2">{["low", "meduim", "high"].map(renderPriorityButton)}</div>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <select
            className="w-full sm:w-40 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={newTask.dueDate}
            onChange={handleDueDateChange}
          >
            <option value="" disabled>Due date</option>
            <option value="1day">1 Day</option>
            <option value="2day">2 Days</option>
            <option value="custom">Pick a date</option>
          </select>
          {newTask.dueDate === "custom" && (
            <input
              type="date"
              className="w-full sm:w-40 p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              value={newTask.dueDate || ""}
            />
          )}
        </div>
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-3 py-2 text-sm rounded hover:bg-indigo-700 transition-colors font-medium border border-indigo-600"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsNewTaskOpen(false)}
            className="w-full text-gray-600 bg-gray-100 px-3 py-2 text-sm rounded hover:bg-gray-200 transition-colors font-medium border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMenuBtn;