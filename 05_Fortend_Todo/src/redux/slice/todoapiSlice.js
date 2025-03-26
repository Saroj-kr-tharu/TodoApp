import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const baseUrl = "http://localhost:3000/todoService";

const fetchTodosAction = createAsyncThunk(
  "todos/getAllTodos",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/getAllTask`, { email });

      if (response?.status === 200) return response?.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.err ||
        error?.response?.data?.message ||
        "Failed to Fetch The Todos ";

      return rejectWithValue(errorMessage);
    }
  }
);

const addTodosAction = createAsyncThunk(
  "todos/createTodos",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/createTask`, data);

      if (response?.status === 201) {
        console.log('todo add', response?.data);

        return response?.data;
      }

    } catch (error) {
      const errorMessage =
        error?.response?.data?.err ||
        error?.response?.data?.message ||
        "Failed to Fetch The Todos ";

      return rejectWithValue(errorMessage);
    }
  }
);

const deleteTodosAction = createAsyncThunk(
  "todos/deleteTodos",
  async (data, { rejectWithValue }) => {
    try {
      let email = data.email;
      let id = data.id;

      const response = await axios.delete(`${baseUrl}/deleteTask`, {
        data: { email },
        params: { id },
      });

      if (response?.status === 200) return response?.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.err ||
        error?.response?.data?.message ||
        "Failed to Delte Todo ";

      return rejectWithValue(errorMessage);
    }
  }
);

const updateTodosAction = createAsyncThunk(
  "todos/updateTodos",
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...taskData } = data;


      const response = await axios.patch(`${baseUrl}/updateTask`, taskData, {
        params: { id },
      });

      if (response?.status === 200) return response?.data;

      throw new Error("Unexpected response status"); // Fallback for unexpected scenarios.
    } catch (error) {
      const errorMessage =
        error?.response?.data?.err ||
        error?.response?.data?.message ||
        "Failed to Update";

      console.error("Update task failed:", error); // Log the error for debugging.
      return rejectWithValue(errorMessage);
    }
  }
);

const todoSlice = createSlice({
  name: "TodoSlice",
  initialState: {
    status: "idle", // idle loading fullfilled
    sucessType: null, // delete, edit ,create , update , getData
    errors: null,
    todos: [{ id: 12, title: "hwlloe ", desc: "" }],
    intial_todo: null
  },
  reducers: {
    completeTodo: (state, action) => {
      // find the id
      const item = state.todos.find((item) => item.id === action.payload);

      // update the id


      if (item) {
        const updateDate = {
          ...item,
          complete: !item.complete,
          completedAt: item.complete ? null : new Date().toISOString(),
        };

        // replace

        state.todos = state.todos.map((item) =>
          item.id === action.payload ? updateDate : item
        );
      }
    },

    resetFilter: (state) => {
      state.todos = state.intial_todo;
    },

    filterTodo: (state, action) => {

      state.todos = state.intial_todo;

      const status = action.payload.status;
      const priority = action.payload.priority;

      if (status == 'FilterStatus' && priority == 'FilterPriority') {
        return;
      }

      if (status == 'FilterStatus') { 
        state.todos = state.todos.filter((item) =>
          item.priority === action.payload.priority
        );
        return;
      }

      if (priority == 'FilterPriority') {
        state.todos = state.todos.filter((item) => item.status === action.payload.status);
        return;
      }

      state.todos = state.todos.filter((item) =>
        item.priority === action.payload.priority && item.status === action.payload.status
      );

    }




  },
  extraReducers: (builder) => {
    builder
      // fetch data
      .addCase(fetchTodosAction.pending, (state) => {
        state.status = "Loading";
        state.errors = null;
        state.sucessType = null;
      })

      .addCase(fetchTodosAction.fulfilled, (state, action) => {
        state.todos = action.payload.data;
        state.errors = null;
        state.sucessType = "FETCHED";
        state.intial_todo = state.todos;
        // state.sucessType=null;
        state.status = "Fullfill";
      })

      .addCase(fetchTodosAction.rejected, (state, action) => {
        state.errors = action.payload;
        state.status = "Failed";
        state.sucessType = null;
      })

      // create todo data
      .addCase(addTodosAction.pending, (state) => {
        state.status = "Loading";
        state.errors = null;
        state.sucessType = null;
      })

      .addCase(addTodosAction.fulfilled, (state, action) => {
        state.errors = null;
        state.sucessType = "CREATED";
        state.status = "Fullfill";


        state.todos.push(action.payload.data);
      })

      .addCase(addTodosAction.rejected, (state, action) => {
        state.errors = action.payload;
        state.status = "Failed";
        state.sucessType = null;
      })

      //delete todo
      .addCase(deleteTodosAction.pending, (state) => {
        state.status = "Loading";
        state.errors = null;
        state.sucessType = null;
      })

      .addCase(deleteTodosAction.fulfilled, (state, action) => {
        state.errors = null;
        state.sucessType = "DELETED";
        state.status = "Fullfill";

        state.todos = state.todos.filter(
          (item) => item.id !== action?.meta?.arg?.id
        );

      })

      .addCase(deleteTodosAction.rejected, (state, action) => {
        state.errors = action.payload;
        state.status = "Failed";
        state.sucessType = null;
      })

      //update todo
      .addCase(updateTodosAction.pending, (state) => {
        state.status = "Loading";
        state.errors = null;
        state.sucessType = null;
      })

      .addCase(updateTodosAction.fulfilled, (state, action) => {
        state.errors = null;
        state.sucessType = "UPDATED";
        state.status = "Fullfill";

        const updateTodo = action.payload.data;

        // update the id
        state.todos = state.todos.map((item) =>
          item.id === updateTodo.id ? updateTodo : item
        );


      })

      .addCase(updateTodosAction.rejected, (state, action) => {
        state.errors = action.payload;
        console.log(action);

        state.status = "Failed";
        state.sucessType = null;
      });
  },
});

export default todoSlice.reducer;
export const { completeTodo, updateTodo, filterTodo, resetFilter } = todoSlice.actions;
export {
  fetchTodosAction,
  addTodosAction,
  deleteTodosAction,
  updateTodosAction,

};
