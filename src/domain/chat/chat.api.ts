import axios from 'axios';
import {
    CreateConversationPayload,
    CreateConversationResponse,
    GetConversationsResponse,
    GetMessagesResponse,
    SendMessageResponse,
} from './chat.types';

// Base API URL
const API_URL = 'http://127.0.0.1:8000/api';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: API_URL, // All requests will use this base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include the Authorization token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add token to request headers
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
export const getConversations = async (): Promise<GetConversationsResponse> => {
    return api.get('/conversations/conversations/');
};

// Create a new conversation
export const createConversation = async (
    data: CreateConversationPayload
): Promise<CreateConversationResponse> => {
    return api.post('/conversations/conversations/', data);
};

// Delete a conversation
export const deleteConversation = async (id: string): Promise<void> => {
    return api.delete(`/conversations/conversations/${id}/`);
};

// Send a message
export const sendMessage = async (
    formData: FormData
): Promise<SendMessageResponse> => {
    return api.post('/conversations/process_message/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// Retrieve messages for a specific conversation
export const getMessages = async (id: string): Promise<GetMessagesResponse> => {
    return api.get(`/conversations/conversations/${id}/messages/`);
};
