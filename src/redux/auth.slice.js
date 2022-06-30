import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper, history } from "../utils";

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

function createInitialState() {
  return {
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
  };
}

function createReducers() {
  return {
    logout,
  };

  function logout(state) {
    state.user = null;
    localStorage.removeItem("user");
    history.navigate("/login");
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

  return {
    login: login(),
  };

  function login() {
    return createAsyncThunk(
      `${name}/login`,
      async ({ username, password }) =>
        await fetchWrapper.post(`${baseUrl}/authenticate`, {
          username,
          password,
        })
    );
  }
}

function createExtraReducers() {
  return {
    ...login(),
  };

  function login() {
    var { pending, fulfilled, rejected } = extraActions.login;
    return {
      [pending]: (state) => {
        state.error = null;
      },
      [fulfilled]: (state, action) => {
        const user = action.payload;
        localStorage.setItem(JSON.stringify(user));
        state.user = user;
        const { from } = history.location.state || { from: { pathname: "/" } };
        history.navigate(from);
      },
      [rejected]: (state, action) => {
        state.error = action.error;
      },
    };
  }
}
