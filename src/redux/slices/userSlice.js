import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const USERS_KEY = "shopping_hify_users";
const USER_INFO_KEY = "shopping_hify_userInfo";

// Load users list
const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Load session based on where user chose to remember
const loadSession = () => {
  try {
    const stored =
      localStorage.getItem(USER_INFO_KEY) || sessionStorage.getItem(USER_INFO_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

/**
 * Register user
 */
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password, remember = true }, { rejectWithValue }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name || !email || !password)
      return rejectWithValue("All fields are required.");
    if (password.length < 6)
      return rejectWithValue("Password must be at least 6 characters.");

    const existing = loadUsers();
    if (existing.find((u) => u.email === normalizedEmail)) {
      return rejectWithValue("User already exists. Please login.");
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password, // Mock only
    };
    existing.push(newUser);
    saveUsers(existing);

    const userInfo = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: "mock-token-" + newUser.id,
    };

    // Save registered user session based on remember option
    if (remember) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    } else {
      sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    }

    return userInfo;
  }
);

/**
 * Login user
 */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ identifier, password, remember }, { rejectWithValue }) => {
    const lookup = identifier.trim().toLowerCase();
    if (!lookup || !password)
      return rejectWithValue("Both identifier and password are required.");

    const users = loadUsers();
    const user = users.find(
      (u) => u.email === lookup || u.name.toLowerCase() === lookup
    );
    if (!user) return rejectWithValue("User not found. Please sign up.");
    if (user.password !== password)
      return rejectWithValue("Incorrect password.");

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: "mock-token-" + user.id,
    };

    // Save to storage based on remember me
    if (remember) {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    } else {
      sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    }

    return userInfo;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: loadSession(),
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
      state.error = null;
      localStorage.removeItem(USER_INFO_KEY);
      sessionStorage.removeItem(USER_INFO_KEY);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed.";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
      });
  },
});

export const { logoutUser, clearError } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export default userSlice.reducer;
