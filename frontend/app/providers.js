"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, signupUser, createSession, joinSession as apiJoinSession } from "../lib/api";

const AppStateContext = createContext(null);

const defaultBoards = [
  {
    id: "team-strategy",
    title: "Team Planning Board",
    description: "Real-time space for sprint planning, wireframes, and sticky note collaboration.",
    updatedAt: "2 hours ago",
  },
  {
    id: "design-review",
    title: "Design Review Session",
    description: "Review mockups and collect feedback with the whole design team.",
    updatedAt: "Yesterday",
  },
];

const defaultChat = {
  "team-strategy": [
    { id: "1", author: "Ayesha", message: "Welcome to the board! Use the chat to coordinate.", timestamp: "09:12 AM" },
    { id: "2", author: "Ali", message: "I added the MVP flow on the left side.", timestamp: "09:15 AM" },
  ],
  "design-review": [
    { id: "1", author: "Sana", message: "Can we move the action button to the top right?", timestamp: "Yesterday" },
  ],
};

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function generateId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AppStateProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    return safeJsonParse(window.localStorage.getItem("cw-user"), null);
  });
  const [boards, setBoards] = useState(() => {
    if (typeof window === "undefined") return defaultBoards;
    return safeJsonParse(window.localStorage.getItem("cw-boards"), defaultBoards);
  });
  const [currentBoardId, setCurrentBoardId] = useState(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("cw-current-board") || null;
  });
  const [chatMessages, setChatMessages] = useState(() => {
    if (typeof window === "undefined") return defaultChat;
    return safeJsonParse(window.localStorage.getItem("cw-chat"), defaultChat);
  });

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem("cw-user");
    } else {
      window.localStorage.setItem("cw-user", JSON.stringify(user));
    }

    window.localStorage.setItem("cw-boards", JSON.stringify(boards));
    window.localStorage.setItem("cw-chat", JSON.stringify(chatMessages));
    window.localStorage.setItem("cw-current-board", currentBoardId || "");
  }, [user, boards, chatMessages, currentBoardId]);

  const login = async ({ email, password }) => {
    if (!email || !password) return { error: "Email and password are required." };
    try {
      const userData = await loginUser(email, password);
      setUser({ id: userData.id, name: userData.username, email: userData.email });
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  const signup = async ({ name, email, password }) => {
    if (!name || !email || !password) return { error: "Name, email and password are required." };
    try {
      const userData = await signupUser(name, email, password);
      setUser({ id: userData.id, name: userData.username, email: userData.email });
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentBoardId(null);
  };

  const createBoard = async (title) => {
    if (!title) return { error: "Board name cannot be empty." };
    if (!user) return { error: "You must be logged in to create a board." };
    try {
      const sessionData = await createSession(user.id);
      const newBoard = {
        id: sessionData.sessionCode,
        title,
        description: "A fresh collaborative room ready for your team.",
        updatedAt: "Just now",
        dbId: sessionData.id // the real backend ID
      };
      setBoards((current) => [newBoard, ...current]);
      setCurrentBoardId(newBoard.id);
      return { success: true, board: newBoard };
    } catch (err) {
      return { error: err.message };
    }
  };

  const joinBoard = async (boardId) => {
    if (!boardId) return { error: "Enter a valid board code to join." };
    if (!user) return { error: "You must be logged in to join a board." };
    try {
      await apiJoinSession(user.id, boardId);
      // Ensure board exists in local list so it can be navigated to
      const exists = boards.some((board) => board.id === boardId);
      if (!exists) {
        const newBoard = {
          id: boardId,
          title: "Joined Board " + boardId,
          description: "A board you joined.",
          updatedAt: "Just now",
        };
        setBoards((current) => [newBoard, ...current]);
      }
      setCurrentBoardId(boardId);
      return { success: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  const sendMessage = (roomId, text) => {
    if (!text || !roomId) return { error: "Message and room must be provided." };
    const message = {
      id: generateId(),
      author: user?.name || "Guest",
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages((current) => ({
      ...current,
      [roomId]: [...(current[roomId] || []), message],
    }));
    return { success: true };
  };

  const value = useMemo(
    () => ({
      user,
      boards,
      currentBoardId,
      chatMessages,
      login,
      signup,
      logout,
      createBoard,
      joinBoard,
      sendMessage,
      currentBoard: boards.find((board) => board.id === currentBoardId) || null,
    }),
    [user, boards, currentBoardId, chatMessages]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
