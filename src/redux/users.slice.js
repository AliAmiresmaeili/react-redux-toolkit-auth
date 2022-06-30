import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../utils";
const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

const name = "users";
const initialState = { users: [] };
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

function createExtraActions() {
  return {
    getAll: getAll(),
  };

  function getAll() {
    return createAsyncThunk(
      `${baseUrl}/getAll`,
      async () => await fetchWrapper.get(baseUrl)
    );
  }
}

function createExtraReducers() {
  return {
    ...getAll(),
  };

  function getAll() {
    var { pending, fulfilled, rejected } = extraActions.getAll;
    return {
      [pending]: (state) => {
        state.users = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.users = action.payload;
      },
      [rejected]: (state, action) => {
        state.users = { error: action.error };
      },
    };
  }
}

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;
