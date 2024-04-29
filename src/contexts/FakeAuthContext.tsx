import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface User {
    email: string;
    password: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

type Action = { type: "login"; payload: User } | { type: "logout" };

const AuthContext = createContext<AuthState | undefined>(undefined);

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

function reducer(state: AuthState, action: Action): AuthState {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, user: null, isAuthenticated: false };
        default:
            throw new Error("Unknown action");
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer<React.Reducer<AuthState, Action>>(reducer, initialState);

    const { user, isAuthenticated } = state;

    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }
    function logout() {
        dispatch({ type: "logout" });
    }

    return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext was used outside of AuthProvider");
    }
}

export { AuthProvider, useAuth };
