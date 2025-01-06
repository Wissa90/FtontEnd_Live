import axios from "axios";
import {
  Conversation,
  CreateConversationPayload,
  Message,
  SendMessageResponse,
} from "./chat.types";

// Base API URL
const API_URL = "https://1dbf-156-174-47-128.ngrok-free.app/api";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_URL, // All requests will use this base URL
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "any value",
  },
});

// Add request interceptor to include the Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to request headers
    }
    return config;
  },
  (error) => {
    // Handle errors in the request configuration
    return Promise.reject(error);
  }
);

// API functions using the Axios instance

// Fetch all conversations
export const getConversations = async (): Promise<Conversation[]> => {
  return (await api.get("/conversations/conversations/")).data;
};

// Create a new conversation
export const createConversation = async (
  data: CreateConversationPayload
): Promise<Conversation> => {
  return {
    ...(await api.post("/conversations/conversations/", data)).data,
    messages: [],
  };
};

// Delete a conversation
export const deleteConversation = async (id: number): Promise<void> => {
  return api.delete(`/conversations/conversations/${id}/`);
};

// Send a message
export const sendMessage = async (
  formData: FormData
): Promise<SendMessageResponse> => {
  return (
    await api.post("/conversations/process_message/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
};

// Retrieve messages for a specific conversation
export const getMessages = async (id: number): Promise<Message[]> => {
  return (await api.get(`/conversations/conversations/${id}/messages/`)).data
    .messages;
};
