// Type for a single message in a conversation
export interface Message {
    id: string; // Unique identifier for the message
    text: string; // Message text
    role: 'user' | 'assistant'; // Role of the message sender (user or AI)
    timestamp: string; // ISO string of when the message was sent
}

// Type for a conversation
export interface Conversation {
    id: string; // Unique identifier for the conversation
    name: string; // Name of the conversation
    created_at: string; // ISO string of when the conversation was created
    user: string; // User ID or name associated with the conversation
    messages: Message[]; // List of messages in the conversation
}

// Type for creating a conversation (request payload)
export interface CreateConversationPayload {
    name: string; // Name of the new conversation
}

// Type for creating a conversation (API response)
export interface CreateConversationResponse {
    id: string; // ID of the created conversation
    name: string; // Name of the created conversation
    created_at: string; // Timestamp of when the conversation was created
    user: string; // User ID associated with the conversation
}

// Type for sending a message (request payload)
export interface SendMessagePayload {
    conversation_id: string; // ID of the conversation to send the message to
    text?: string; // Optional text content of the message
    image?: File; // Optional image file
    voiceNote?: File; // Optional voice note file
}

// Type for sending a message (API response)
export interface SendMessageResponse {
    details: {
        text: {
            response: string; // AI-generated response text
        };
    };
}

// Type for getting conversations (API response)
export interface GetConversationsResponse {
    data: Conversation[]; // Array of conversations
}

// Type for getting messages in a conversation (API response)
export interface GetMessagesResponse {
    data: {
        messages: Message[]; // Array of messages in the conversation
    };
}

// Type for handling errors
export interface APIError {
    status: number; // HTTP status code
    message: string; // Error message
}
