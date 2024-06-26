
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://localhost:3000');
  const data = await response.json();
  return data;
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
  const response = await fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data.user;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }) => {
  const response = await fetch(`http://localhost:3000/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return { id, user: data.user };
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await fetch(`http://localhost:3000/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, user } = action.payload;
        const existingUser = state.data.find((user) => user._id === id);
        if (existingUser) {
          Object.assign(existingUser, user);
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user._id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
