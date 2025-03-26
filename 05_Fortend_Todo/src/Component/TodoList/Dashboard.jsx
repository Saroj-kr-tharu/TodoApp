import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Save, Edit2, Trash2, Clock, CheckCircle } from "lucide-react";
import dateHelper from "../../utlis/Date_helper";
import AddMenuBtn from "./AddMenuBtn";
import Tooltip from "./ToolKit";

import {
  fetchTodosAction,
  deleteTodosAction,
  updateTodosAction,
  completeTodo,
  filterTodo,
} from "../../redux/slice/todoapiSlice";

import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../redux/slice/authenticationSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.TodoReducer.todos);
  const getErrors = useSelector((state) => state.TodoReducer.errors);
  const getState = useSelector((state) => state.TodoReducer.status);
  const getSuccessType = useSelector((state) => state.TodoReducer.sucessType);
  const [taskData, setTaskData] = useState({
    priority: "low",
    status: "pending",
  });

  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [editedTasks, setEditedTasks] = useState(null);
  const [activeTasks, setActiveTasks] = useState(null);
  const [isCompleted, setIsCompleted] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("FilterPriority");
  const [selectedStatus, setSelectedStatus] = useState("FilterStatus");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      dispatch(logOutUser());
      toast.success("Token is Expired ");
      navigate("/");
    }

    if (user) {
      const email = user?.email;
      setEmail(email);
      dispatch(fetchTodosAction(email));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (selectedPriority || selectedStatus) {
      dispatch(filterTodo({
        type: "priorityAndStatus",
        priority: selectedPriority || "all",
        status: selectedStatus || "all",
      }));
    }
  }, [selectedPriority, selectedStatus, dispatch]);

  useEffect(() => {
    if (getState === "Fullfill") {
      toast.success(`Successfully ${getSuccessType} TASK`);
    } else if (getState === "Failed") {
      toast.error(getErrors);
    }
  }, [getState, getErrors, getSuccessType]);

  const handleDelete = (id) => {
    dispatch(deleteTodosAction({ email, id }));
  };

  const handleSave = (id) => {
    if (activeTasks) {
      dispatch(updateTodosAction({ id, email, complete: isCompleted }));
      setActiveTasks(null);
      setIsCompleted(null);
    }

    if (editedTasks) {
      dispatch(updateTodosAction({ ...taskData, email, id }));
      setEditedTasks(null);
      setTaskData({
        priority: "low",
        status: "pending",
        title: "",
        description: "",
        dueDate: "",
      });
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = todos.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "low",
        status: taskToEdit.status || "pending",
        dueDate: taskToEdit.dueDate || "",
      });
      setEditedTasks(id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleComplete = (id, completeStatus) => {
    setIsCompleted(!completeStatus);
    dispatch(completeTodo(id));
    setActiveTasks(id);
  };

  if (getState === "Loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-base sm:text-xl text-gray-600">Loading...</div>
        <div className="ml-4 w-6 h-6 sm:w-8 sm:h-8 border-4 border-t-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-2 py-4 sm:px-4">
      <div className="rounded-lg max-w-4xl mx-auto bg-gray-400">

      <header className="sticky top-14 z-10 bg-gray-400 p-3 shadow-md">
          <Toaster position="bottom-left" reverseOrder={false} />

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold">My Tasks</h1>
              <p className="text-sm sm:text-xl text-black">Keep track of your daily progress</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="flex gap-2 flex-1 sm:flex-none">
                <Tooltip text="Priority Filter">
                  <select
                    name="priority"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="p-1.5 text-sm border border-gray-300 rounded-md min-w-[90px]"
                  >
                    <option value="FilterPriority">All</option>
                    <option value="high">High</option>
                    <option value="meduim">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </Tooltip>

                <Tooltip text="Status Filter">
                  <select
                    name="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="p-1.5 text-sm border border-gray-300 rounded-md min-w-[90px]"
                  >
                    <option value="FilterStatus">All</option>
                    <option value="pending">Pending</option>
                    <option value="incomplete">InComplete</option>
                    <option value="complete">Completed</option>
                  </select>
                </Tooltip>
              </div>

              <button
                onClick={() => setIsNewTaskOpen(!isNewTaskOpen)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 text-sm"
              >
                <Plus size={24} />
                Add Task
              </button>
            </div>
          </div>

          {isNewTaskOpen && <AddMenuBtn setIsNewTaskOpen={setIsNewTaskOpen} />}
        </header>

        <div className="space-y-3 mx-auto  p-3 sm:p-6">
        {todos.map((item) => (
          <div
            key={item.id}
            className={`bg-gray-300 border border-black rounded-lg 
            shadow-sm hover:shadow-md 
            transition-all duration-300 hover:border-indigo-700 ${item.complete ? "opacity-75" : ""}`}
          >
            <div className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className={`flex-1 ${item.complete ? "line-through opacity-50" : ""}`}>
                    {editedTasks === item.id ? (
                      <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleInputChange}
                        className="text-lg font-bold border-2 border-indigo-500 p-2 rounded-md focus:outline-none w-full"
                      />
                    ) : (
                      <h2 className="text-lg sm:text-2xl font-bold">{item.title}</h2>
                    )}
                  </div>
                  
                  <div className="flex gap-1 ml-2">
                    <Tooltip text="Save">
                      {(editedTasks === item.id || activeTasks === item.id) && (
                        <button onClick={() => handleSave(item.id)}
                          className="p-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                          <Save size={24} />
                        </button>
                      )}
                    </Tooltip>

                    <Tooltip text={item.complete ? "Mark as incomplete" : "Mark as complete"}>
                      <button onClick={() => toggleComplete(item.id, item.complete)}
                        className={`p-1.5 rounded-md transition-colors ${
                          item.complete
                            ? "text-blue-900 bg-green-50"
                            : "text-black hover:text-green-600 hover:bg-green-50"
                        }`}>
                        <CheckCircle size={24} />
                      </button>
                    </Tooltip>

                    <Tooltip text="Edit task">
                      <button onClick={() => handleEdit(item.id)}
                        className="p-1.5 rounded-md text-orange-950 hover:text-blue-600 hover:bg-blue-50">
                        <Edit2 size={24} />
                      </button>
                    </Tooltip>

                    <Tooltip text="Delete task">
                      <button onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-md text-red-900 hover:text-red-600 hover:bg-red-50">
                        <Trash2 size={24} />
                      </button>
                    </Tooltip>
                  </div>
                </div>

                {editedTasks === item.id ? (
                  <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    className="text-gray-800 border-2 border-gray-700 p-2 rounded-md focus:outline-none w-full text-sm"
                    rows="2"
                  />
                ) : (
                  <p className="text-sm sm:text-lg text-gray-800">{item.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {editedTasks === item.id ? (
                    <>
                      <select
                        name="priority"
                        value={taskData.priority}
                        onChange={handleInputChange}
                        className="p-1 border border-gray-300 rounded-md"
                      >
                        <option value="high">High</option>
                        <option value="meduim">Medium</option>
                        <option value="low">Low</option>
                      </select>

                      <select
                        name="status"
                        value={taskData.status}
                        onChange={handleInputChange}
                        className="p-1 border border-gray-300 rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="complete">Completed</option>
                        <option value="incomplete">Incomplete</option>
                      </select>

                      <input
                        type="date"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleInputChange}
                        className="p-1 border border-gray-300 rounded-md"
                      />
                    </>
                  ) : (
                    <>
                      <Tooltip text="Priority">
                        <span className={`px-2 py-1 rounded-xl font-medium text-sm sm:text-lg ${
                          item.priority === "high"
                            ? "bg-red-700 text-red-100"
                            : item.priority === "medium"
                            ? "bg-slate-900 text-yellow-100"
                            : "bg-green-900 text-green-100"
                        }`}>
                          {item.priority === "high" ? "High" : item.priority === "meduim" ? "Medium" : "Low"}
                        </span>
                      </Tooltip>

                      <Tooltip text="Status">
                        <span className={`px-2 py-1 text-sm sm:text-lg rounded-xl  ${
                          item.status === "pending"
                            ? "bg-blue-900 text-blue-100"
                            : item.status === "completed"
                            ? "bg-green-900 text-green-100"
                            : "bg-orange-900 text-orange-100"
                        }`}>
                          {item.status}
                        </span>
                      </Tooltip>

                      <div className="flex items-center border border-black px-2 py-0.5 rounded-md gap-1 text-slate-900">
                        <Tooltip text="Time Left">
                          <div className="flex text-sm sm:text-lg items-center gap-1">
                            <Clock size={20} />
                            <span>{dateHelper.calculateTimeLeft(item.dueDate)}</span>
                          </div>
                        </Tooltip>
                      </div>

                      <Tooltip text="Due Date">
                        <span className="text-slate-900 text-sm sm:text-lg">
                          Due: {dateHelper.formatDate(item.dueDate)}
                        </span>
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

        
      </div>
    </div>
  );
}

export default Dashboard;