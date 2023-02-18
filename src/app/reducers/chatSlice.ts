import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchQAChatApi } from "../api/chatApi";
import { v4 } from "uuid";

export const getChatResponse = createAsyncThunk(
  "chat/updateChatContent",
  async (requestInfo: Object, thunkAPI) => {
    const response = await fetchQAChatApi(requestInfo);
    return response.result;
  }
);

export interface ChatState {
  id: null | string;
  chatInfo: chatItem[];
  updatedAt: number;
}

export interface chatItem {
  id: string;
  sentBy: string;
  question?: string;
  created: number;
  choices: Array<eachChoice>;
  model?: string;
  object?: string;
  usage?: Record<string, number>;
}

export interface eachChoice {
  text: string | undefined;
}

const initialState: ChatState = {
  id: null,
  chatInfo: [],
  updatedAt: Date.now(),
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveQuestion: (state, action: PayloadAction<chatItem>) => {
      const choice = { text: action.payload.question };
      action.payload.choices?.push(choice);
      state.chatInfo.push(action.payload);
      state.updatedAt = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getChatResponse.fulfilled,
      (state, action: PayloadAction<chatItem>) => {
        if (!state.id) {
          state.id = v4();
        }
        action.payload.sentBy = "Bot";
        state.chatInfo.push(action.payload);
        state.updatedAt = Date.now();
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { saveQuestion } = chatSlice.actions;

export default chatSlice.reducer;
