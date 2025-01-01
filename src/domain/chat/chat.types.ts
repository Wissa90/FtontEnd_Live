// Type for a single message in a conversation
export interface Message {
  id: number;
  ai_response: string;
  user_question: string;
  timestamp: string; // ISO string of when the message was sent
}

// Type for a conversation
export interface Conversation {
  id: number;
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
  id: number; // ID of the created conversation
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

// Type for handling errors
export interface APIError {
  status: number; // HTTP status code
  message: string; // Error message
}
